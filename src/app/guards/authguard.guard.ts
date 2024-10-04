import { CanActivateFn, Router } from '@angular/router';
import { CookiesService } from '../services/cookies.service';
import { inject } from '@angular/core';

export const authguardGuard: CanActivateFn = (route, state) => {
  const authService = inject(CookiesService); 
  const router = inject(Router); 
  
  const admintoken = authService.getAdminToken();
  if (admintoken && !authService.isTokenAdminExpired(admintoken)) {
    return true
  }else {
    router.navigate(['/adminsignin']); 
    return false;
  }
};
