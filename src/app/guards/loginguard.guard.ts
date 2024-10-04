import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookiesService } from '../services/cookies.service';

export const loginguardGuard: CanActivateFn = (route, state) => {
  const authService = inject(CookiesService);
  const router = inject(Router);

  
  
  const token = authService.getToken();

  if (token && !authService.isTokenExpired(token)) {
    return true;
  } else {
    router.navigate(['/signin']); 
    return false; 
  }
};
