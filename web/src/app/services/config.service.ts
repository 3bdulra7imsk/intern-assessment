import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config = {
    apiUrl: environment.apiUrl,
    production: environment.production
  };

  get apiUrl(): string {
    // Allow runtime override via window object for deployment flexibility
    const windowObj = window as unknown as Record<string, string>;
    return windowObj['API_URL'] || this.config.apiUrl;
  }

  get isProduction(): boolean {
    return this.config.production;
  }

  // Method to update config at runtime if needed
  updateApiUrl(url: string): void {
    this.config.apiUrl = url;
  }
}