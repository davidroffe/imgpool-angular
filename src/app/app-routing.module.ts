import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/posts' },
  { path: '**', pathMatch: 'full', redirectTo: '/posts' },
  // {path: '/account', pathMatch: 'full', component: AccountDashboard},
  // {path: '/password-reset/:passwordResetToken', pathMatch: 'full', component: PasswordReset},
  // {path: '/admin', pathMatch: 'full', component: AdminDashboard},
  // {path: '/user/:id', pathMatch: 'full', component: UserProfile},
  // {path: '/flags', pathMatch: 'full', component: FlagList},
  // {path: '/about', pathMatch: 'full', component: About},
  // {path: '/admin', pathMatch: 'full', component: AdminDashboard},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
