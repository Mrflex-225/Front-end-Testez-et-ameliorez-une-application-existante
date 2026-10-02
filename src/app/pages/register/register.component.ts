import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { UserService } from '../../core/service/user.service';
import { Register } from '../../core/models/Register';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [CommonModule, MaterialModule],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  registerForm: FormGroup = new FormGroup({});
  submitted: boolean = false;

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        login: ['', Validators.required],
        password: ['', Validators.required]
      },
    );
  }

  get form() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const registerUser: Register = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      login: this.registerForm.get('login')?.value,
      password: this.registerForm.get('password')?.value
    };

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.userService.register(registerUser)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.successMessage.set('Inscription réussie ! Redirection...');
          
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.message || 'Une erreur est survenue lors de l\'inscription.');
        }
      });
  }

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }

    goToLogin():void{
    this.router.navigate(['/login']);
  }

}
