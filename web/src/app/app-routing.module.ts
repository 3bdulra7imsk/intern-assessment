import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtectedComponent } from './protected/protected.component';
import { AuthGuard } from './protected/guards/auth.guard';

const routes: Routes = [
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' } // fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
