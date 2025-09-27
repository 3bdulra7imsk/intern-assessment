import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const raw = localStorage.getItem('auth');
    if (!raw) {
      this.router.navigate(['/login']); // redirect to login
      return false;
    }
    const { token, expiry } = JSON.parse(raw);
    if (!token || Date.now() > expiry) {
      localStorage.removeItem('auth');
      this.router.navigate(['/login']); // redirect to login
      return false;
    }
    return true;
  }
}
