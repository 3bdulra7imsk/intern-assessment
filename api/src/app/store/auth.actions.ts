import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{email:string,password:string}>());
export const loginSuccess = createAction('[Auth] Login Success', props<{token:string, user:any}>());
export const loginFailure = createAction('[Auth] Login Failure', props<{error:any}>());
export const logout = createAction('[Auth] Logout');
export const signup = createAction('[Auth] Signup', props<{email:string,password:string}>());
