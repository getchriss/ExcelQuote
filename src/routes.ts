import { Routes } from '@angular/router';
import { SignupFormComponent } from './app/signup-form/signup-form.component';
import { LoginFormComponent } from './app/login-form/login-form.component';
import { DashComponent } from './app/dash/dash.component';
import { QuoteFormComponent } from './app/quote-form/quote-form.component';

export const appRoutes: Routes = [
  { path: 'signup', component: SignupFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'dash', component: DashComponent },
  { path: 'quote-form', component: QuoteFormComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
