import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {
  items: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getItems().subscribe({
      next: (res: any) => this.items = res,
      error: (err) => console.error(err)
    });
  }
}
