import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const raw = localStorage.getItem('auth');
    if (!raw) return next.handle(req);
    const { token, expiry } = JSON.parse(raw);
    if (!token) return next.handle(req);
    // check expiry
    if (Date.now() > expiry) {
      localStorage.removeItem('auth');
      return next.handle(req);
    }
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next.handle(cloned);
  }
}
