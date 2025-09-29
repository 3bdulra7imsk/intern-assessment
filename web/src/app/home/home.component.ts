import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-home',
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <!-- Navigation Header -->
      <nav class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0 flex items-center">
                <div class="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span class="text-white font-bold text-sm">IA</span>
                </div>
                <span class="ml-3 text-xl font-bold text-gray-900">Intern Assessment</span>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <button 
                (click)="navigateToLogin()"
                class="bg-white hover:bg-gray-50 text-gray-900 px-4 py-2 rounded-lg border border-gray-300 font-medium transition-all duration-200 hover:shadow-md"
              >
                Sign In
              </button>
              <button 
                (click)="navigateToSignup()"
                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md transform hover:scale-105"
              >
                Sign Up
              </button>
              <button 
                (click)="navigateToProtected()"
                class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md transform hover:scale-105"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <div class="relative">
        <!-- Background Pattern -->
        <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div class="text-center">
            <!-- Hero Badge -->
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-8 border border-primary-200">
              <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Welcome to the Future of Assessments
            </div>

            <!-- Main Heading -->
            <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Streamline Your
              <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Assessment
              </span>
              Process
            </h1>

            <!-- Subtitle -->
            <p class="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Powerful, secure, and intuitive platform for managing assessments and tracking progress. 
              Built with modern technology for the modern workplace.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button 
                (click)="navigateToSignup()"
                class="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
              >
                <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
                Sign Up Free
              </button>
              <button 
                (click)="navigateToLogin()"
                class="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
              >
                <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                </svg>
                Sign In
              </button>
              <button 
                (click)="navigateToProtected()"
                class="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg border border-gray-300 transition-all duration-200 hover:shadow-lg flex items-center justify-center"
              >
                <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 616 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                View Dashboard
              </button>
            </div>

            <!-- Features Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              <div class="bg-white rounded-2xl p-8 card-shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div class="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Secure Authentication</h3>
                <p class="text-gray-600">Advanced security measures with JWT tokens and protected routes to keep your data safe.</p>
              </div>

              <div class="bg-white rounded-2xl p-8 card-shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div class="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Real-time Analytics</h3>
                <p class="text-gray-600">Track progress and performance with detailed analytics and insights.</p>
              </div>

              <div class="bg-white rounded-2xl p-8 card-shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div class="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Lightning Fast</h3>
                <p class="text-gray-600">Built with modern technology stack for optimal performance and user experience.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="text-center">
            <div class="flex items-center justify-center mb-4">
              <div class="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">IA</span>
              </div>
              <span class="ml-3 text-xl font-bold">Intern Assessment</span>
            </div>
            <p class="text-gray-400">Building the future of assessments, one step at a time.</p>
            <div class="mt-8 pt-8 border-t border-gray-700">
              <p class="text-sm text-gray-500">&copy; 2025 Intern Assessment. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .bg-grid-pattern {
      background-image: 
        linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
      background-size: 50px 50px;
    }
  `]
})
export class HomeComponent {
  private router = inject(Router);

  navigateToProtected() {
    this.router.navigate(['/protected']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
