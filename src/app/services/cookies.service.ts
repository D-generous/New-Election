import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private router: Router) {}

  // Get JWT token from cookies (or local storage)
  getToken(): string | null {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('jwt_token='))
      ?.split('=')[1] || null;
  }

  // Check if the token is expired using angular-jwt
  // isTokenExpired(token: string): boolean {
  //   const helper = new JwtHelperService();
  //   return helper.isTokenExpired(token);
  // }

  // Clear JWT and logout
  logout(): void {
    document.cookie = 'jwt_token=; Max-Age=0; path=/;';
    this.router.navigate(['/signin']);
  }

  getAdminToken(): string | null {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('adminjwt_token='))
      ?.split('=')[1] || null;
  }

  // isTokenAdminExpired(admintoken: string): boolean {
  //   const helper = new JwtHelperService();
  //   return helper.isTokenExpired(admintoken);
  // }

  logoutAdmin(): void {
    document.cookie = 'adminjwt_token=; Max-Age=0; path=/;';
    this.router.navigate(['/adminsignin']);
  }

  // // Function to get a specific cookie by name
  // getCookie(name: string): string | null {
  //   const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  //   if (match) {
  //     return match[2];
  //   }
  //   return null;
  // }

  // // Check if the session cookie exists
  // hasSessionCookie(): boolean {
  //   return this.getCookie('jwt') !== null; // Assuming 'session' is the cookie name set by the backend
  // }
}
