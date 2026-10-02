import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // Signals globaux ou gestion de messages
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  showSuccess(message: string) {
    this.successMessage.set(message);
    this.errorMessage.set(null);
    setTimeout(() => this.clear(), 4000);
  }

  showError(message: string) {
    this.errorMessage.set(message);
    this.successMessage.set(null);
  }

  clear() {
    this.successMessage.set(null);
    this.errorMessage.set(null);
  }
}