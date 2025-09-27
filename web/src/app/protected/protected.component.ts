import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { Item } from '../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  items: Item[] = [];
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.getItems().subscribe({
      next: (response: Item[]) => {
        this.items = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to load items. Please try again.';
        this.isLoading = false;
        console.error('Error loading items:', error);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  navigateToItems(): void {
    this.router.navigate(['/items']);
  }

  formatDate(dateString?: string): string {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  trackByFn(index: number, item: Item): string {
    return item._id || index.toString();
  }

  getItemInitials(name: string): string {
    return name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
  }
}
