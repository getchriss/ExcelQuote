import { Routes } from '@angular/router';
import { SignupFormComponent } from './app/signup-form/signup-form.component';
import { LoginFormComponent } from './app/login-form/login-form.component';
import { DashComponent } from './app/dash/dash.component';
<<<<<<< HEAD
import { QuoteFormComponent } from './app/quote-form/quote-form.component';
=======
import { QuoteManagementComponent } from './app/quote-management/quote-management.component';
import { QuotePreviewComponent } from './app/quote-preview/quote-preview.component';
import { QuoteFormComponent } from './app/quote-form/quote-form.component';
import { NewFormComponent } from './app/new-form/new-form.component';
>>>>>>> ca30e19548f5e2917a1252d428b5da8068f3c251

export const appRoutes: Routes = [
  { path: 'signup', component: SignupFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'dash', component: DashComponent },
<<<<<<< HEAD
  { path: 'quote-form', component: QuoteFormComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
=======
  { path: 'quoteManagement', component: QuoteManagementComponent },
  { path: 'quotePreview', component: QuotePreviewComponent },
  { path: 'new-form', component: NewFormComponent },
  { path: 'form', component: QuoteFormComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
>>>>>>> ca30e19548f5e2917a1252d428b5da8068f3c251
];
