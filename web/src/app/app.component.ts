import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent implements OnInit {
  private router = inject(Router);

  ngOnInit() {
    const raw = localStorage.getItem('auth');
    if (!raw) return;
    const { token, expiry } = JSON.parse(raw);
    if (!token) return;
    if (Date.now() > expiry) {
      localStorage.removeItem('auth');
      return;
    }
    // Token is valid, user can access protected routes
    console.log('User is authenticated with token:', token);
  }
}
