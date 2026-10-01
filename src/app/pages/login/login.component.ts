import { Component, Inject } from '@angular/core';
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

constructor(
  private userService: UserService,
  private authService: AuthService,
  private router: Router
) {}

  login():void{
    this.userService.login(this.loginRequest).subscribe({
      next:(token) => {
        console.log('AUTH SERVICE =', this.authService);
console.log('SET TOKEN =', this.authService.setToken);
        console.log('Token reçu',token);
          this.authService.setToken(token);
            this.router.navigate([
          '/students'
        ]);
      },
      error: (error) => {
        console.error('Erreur de connexion :',error)
      }
      });
  }

}
