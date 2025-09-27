import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Item, CreateItemDto } from '../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">My Items</h1>
            <p class="text-gray-600 mt-1">Manage your personal items</p>
          </div>
          <button
            (click)="logout()"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Logout
          </button>
        </div>

        <!-- Add New Item Form -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Add New Item</h2>
          <form [formGroup]="itemForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                  Name <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  formControlName="name"
                  placeholder="Enter item name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  [class.border-red-500]="itemForm.get('name')?.invalid && itemForm.get('name')?.touched"
                />
                <div *ngIf="itemForm.get('name')?.invalid && itemForm.get('name')?.touched" class="text-red-500 text-sm mt-1">
                  Name is required
                </div>
              </div>
              <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  formControlName="description"
                  placeholder="Enter description (optional)"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                id="completed"
                formControlName="completed"
                class="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label for="completed" class="ml-2 text-sm font-medium text-gray-700">
                Mark as completed
              </label>
            </div>
            <div class="flex gap-2">
              <button
                type="submit"
                [disabled]="itemForm.invalid || isSubmitting()"
                class="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {{ editingItem() ? 'Update Item' : 'Add Item' }}
              </button>
              <button
                *ngIf="editingItem()"
                type="button"
                (click)="cancelEdit()"
                class="px-6 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading()" class="flex justify-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>

        <!-- Error State -->
        <div *ngIf="error()" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-800">{{ error() }}</p>
            </div>
          </div>
        </div>

        <!-- Items List -->
        <div class="space-y-4">
          <div *ngFor="let item of items()" 
               class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3">
                  <button
                    (click)="toggleComplete(item)"
                    class="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
                    [class]="item.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-indigo-500'"
                  >
                    <svg *ngIf="item.completed" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </button>
                  <h3 
                    class="text-lg font-semibold transition-colors"
                    [class]="item.completed ? 'text-gray-500 line-through' : 'text-gray-900'"
                  >
                    {{ item.name }}
                  </h3>
                  <span 
                    *ngIf="item.completed"
                    class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                  >
                    Completed
                  </span>
                </div>
                <p 
                  *ngIf="item.description"
                  class="mt-2 text-gray-600"
                  [class]="item.completed ? 'line-through' : ''"
                >
                  {{ item.description }}
                </p>
                <p class="text-sm text-gray-400 mt-2">
                  Created: {{ formatDate(item.createdAt) }}
                </p>
              </div>
              <div class="flex gap-2 ml-4">
                <button
                  (click)="editItem(item)"
                  class="px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  Edit
                </button>
                <button
                  (click)="deleteItem(item)"
                  class="px-3 py-1 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="items().length === 0 && !isLoading()" class="text-center py-12">
          <div class="w-16 h-16 mx-auto mb-4 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4.5a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5V5" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No items yet</h3>
          <p class="text-gray-600">Add your first item to get started!</p>
        </div>
      </div>
    </div>
  `
})
export class ItemsComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  items = signal<Item[]>([]);
  isLoading = signal(false);
  isSubmitting = signal(false);
  error = signal<string>('');
  editingItem = signal<Item | null>(null);

  itemForm: FormGroup;

  constructor() {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      description: [''],
      completed: [false]
    });
  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.isLoading.set(true);
    this.error.set('');
    
    this.authService.getItems()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (items) => {
          this.items.set(items);
        },
        error: (err) => {
          this.error.set('Failed to load items. Please try again.');
          console.error('Load items error:', err);
        }
      });
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.isSubmitting.set(true);
      this.error.set('');
      
      const formData = this.itemForm.value as CreateItemDto;
      
      const editingItemId = this.editingItem()?._id;
      const operation = editingItemId
        ? this.authService.updateItem(editingItemId, formData)
        : this.authService.createItem(formData);

      operation
        .pipe(finalize(() => this.isSubmitting.set(false)))
        .subscribe({
          next: () => {
            this.itemForm.reset({ completed: false });
            this.editingItem.set(null);
            this.loadItems();
          },
          error: (err) => {
            this.error.set('Failed to save item. Please try again.');
            console.error('Save item error:', err);
          }
        });
    }
  }

  editItem(item: Item) {
    this.editingItem.set(item);
    this.itemForm.patchValue({
      name: item.name,
      description: item.description || '',
      completed: item.completed || false
    });
    
    // Scroll to form
    document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
  }

  cancelEdit() {
    this.editingItem.set(null);
    this.itemForm.reset({ completed: false });
  }

  deleteItem(item: Item) {
    if (!item._id) return;
    
    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
      this.authService.deleteItem(item._id)
        .subscribe({
          next: () => {
            this.loadItems();
          },
          error: (err) => {
            this.error.set('Failed to delete item. Please try again.');
            console.error('Delete item error:', err);
          }
        });
    }
  }

  toggleComplete(item: Item) {
    if (!item._id) return;
    
    this.authService.toggleItemComplete(item._id)
      .subscribe({
        next: () => {
          this.loadItems();
        },
        error: (err) => {
          this.error.set('Failed to update item. Please try again.');
          console.error('Toggle complete error:', err);
        }
      });
  }

  formatDate(dateString?: string): string {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}