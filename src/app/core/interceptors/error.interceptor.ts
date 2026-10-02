import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Une erreur inattendue est survenue.';

      if (error.error instanceof ErrorEvent) {
        // Erreur réseau ou client
        errorMessage = `Erreur client : ${error.error.message}`;
      } else {
        // Erreur renvoyée par le backend (ex: message personnalisé dans le JSON d'erreur)
        errorMessage = error.error?.message || error.error?.error || `Erreur serveur (${error.status})`;
      }

      console.error('[ErrorInterceptor] :', error);
      
      // On renvoie l'erreur formatée au composant/service qui a fait l'appel
      return throwError(() => ({ status: error.status, message: errorMessage }));
    })
  );
};