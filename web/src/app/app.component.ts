import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../../../api/src/app/store/auth.actions';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent implements OnInit {
    constructor(private store: Store) {}
  
    ngOnInit() {
      const raw = localStorage.getItem('auth');
      if (!raw) return;
      const { token, expiry } = JSON.parse(raw);
      if (!token) return;
      if (Date.now() > expiry) {
        localStorage.removeItem('auth');
        return;
      }
      this.store.dispatch(loginSuccess({ token, user: null }));
    }
  }
  