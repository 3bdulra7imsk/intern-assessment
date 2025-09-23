import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authService.login(action.email, action.password).pipe(
          map(res => {
            const token = res.token;
            const user = res.user || null;
            // persist token with expiry (8 hours)
            const expiry = Date.now() + 8 * 60 * 60 * 1000;
            localStorage.setItem('auth', JSON.stringify({ token, expiry }));
            return AuthActions.loginSuccess({ token, user });
          }),
          catchError(err => of(AuthActions.loginFailure({ error: err })))
        )
      )
    )
  );

  // navigate on success
  loginSuccess$ = createEffect(
    () => this.actions$.pipe(ofType(AuthActions.loginSuccess), tap(() => this.router.navigate(['/protected']))),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}
