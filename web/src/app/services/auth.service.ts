import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3333'; // backend URL

  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, { email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  getItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/items`);
  }

  logout() {
    localStorage.removeItem('auth');
  }

  saveToken(token: string) {
    const expiry = Date.now() + 8 * 60 * 60 * 1000; // 8 hours
    localStorage.setItem('auth', JSON.stringify({ token, expiry }));
  }
}
