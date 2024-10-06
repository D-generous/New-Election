import { CanActivateFn, Router } from '@angular/router';
import { CookiesService } from '../services/cookies.service';
import { inject } from '@angular/core';

export const authguardGuard: CanActivateFn = (route, state) => {
  // let routes = inject(Router)
  // let user = JSON.parse(localStorage.getItem('food')!)

  // if(!user){
  //   routes.navigate(['/signin'])
  // }
  
  return true;
};
