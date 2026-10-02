import { Component, Inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequestDTO } from '../../core/models/login-request.dto';
import { UserService } from '../../core/service/user.service';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginRequest:LoginRequestDTO = {
    login:'',
    password:''
  };
isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
constructor(
  private userService: UserService,
  private authService: AuthService,
  private router: Router
) {}

  login():void{
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.userService.login(this.loginRequest).subscribe({
      next:(token) => {
        this.isLoading.set(false);
        this.successMessage.set('Connexion réussie ! Redirection...');
        console.log('AUTH SERVICE =', this.authService);
console.log('SET TOKEN =', this.authService.setToken);
        console.log('Token reçu',token);
          this.authService.setToken(token);
            this.router.navigate([
          '/students'
        ]);
      },
      error: (error) => {
        this.isLoading.set(false);
        // Grâce à l'intercepteur d'erreurs, error.message contient le message propre
        this.errorMessage.set(error.message || 'Identifiants incorrects.');
      }
      });
  }

  goToRegister():void{
    this.router.navigate(['/register']);
  }

}
