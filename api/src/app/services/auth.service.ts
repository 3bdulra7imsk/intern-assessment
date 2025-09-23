import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'http://localhost:3333';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<any> {
    return this.http.post(`${API}/auth/signup`, { email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${API}/auth/login`, { email, password });
  }

  getItems(): Observable<any> {
    return this.http.get(`${API}/items`);
  }
}
