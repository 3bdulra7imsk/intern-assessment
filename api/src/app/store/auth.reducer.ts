import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState { token: string|null; user:any|null; }
export const initialState: AuthState = { token: null, user: null };

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (s, { token, user }) => ({ ...s, token, user })),
  on(AuthActions.logout, () => initialState)
);
