import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

interface User {
  _id: string;
  email: string;
  createdAt?: string;
}

interface AuthResponse {
  token: string;
  user?: User;
}

interface SignupResponse {
  token: string;
  user?: User;
}

export interface Item {
  _id?: string;
  name: string;
  description?: string;
  completed?: boolean;
  owner?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateItemDto {
  name: string;
  description?: string;
  completed?: boolean;
}

export interface UpdateItemDto {
  name?: string;
  description?: string;
  completed?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private config = inject(ConfigService);
  
  private get apiUrl(): string {
    return `${this.config.apiUrl}/api`;
  }

  signup(email: string, password: string): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.apiUrl}/auth/signup`, { email, password });
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password });
  }

  // Items CRUD Operations
  getItems(): Observable<Item[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Item[]>(`${this.apiUrl}/items`, { headers });
  }

  getItem(id: string): Observable<Item> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Item>(`${this.apiUrl}/items/${id}`, { headers });
  }

  createItem(item: CreateItemDto): Observable<Item> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Item>(`${this.apiUrl}/items`, item, { headers });
  }

  updateItem(id: string, item: UpdateItemDto): Observable<Item> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Item>(`${this.apiUrl}/items/${id}`, item, { headers });
  }

  deleteItem(id: string): Observable<void> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/items/${id}`, { headers });
  }

  toggleItemComplete(id: string): Observable<Item> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Item>(`${this.apiUrl}/items/${id}/toggle`, {}, { headers });
  }

  getToken(): string | null {
    const raw = localStorage.getItem('auth');
    if (!raw) return null;
    
    try {
      const { token, expiry } = JSON.parse(raw);
      if (!token || Date.now() > expiry) {
        localStorage.removeItem('auth');
        return null;
      }
      return token;
    } catch {
      localStorage.removeItem('auth');
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('auth');
  }

  saveToken(token: string): void {
    const expiry = Date.now() + 8 * 60 * 60 * 1000; // 8 hours
    localStorage.setItem('auth', JSON.stringify({ token, expiry }));
  }
}
