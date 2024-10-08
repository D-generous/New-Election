import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authguardGuard: CanActivateFn = (route, state) => {
  let routes = inject(Router)
  let user = JSON.parse(localStorage.getItem('adfood')!)

  if(!user){
    routes.navigate(['/adminsignin'])
  }
  
  return true;
};
