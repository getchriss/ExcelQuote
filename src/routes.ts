import { Routes } from '@angular/router';
import { SignupFormComponent } from './app/signup-form/signup-form.component';
import { LoginFormComponent } from './app/login-form/login-form.component';
import { DashComponent } from './app/dash/dash.component';
import { QuoteManagementComponent } from './app/quote-management/quote-management.component';
import { QuotePreviewComponent } from './app/quote-preview/quote-preview.component';
// import { QuoteFormComponent } from './app/quote-form/quote-form.component';
import { NewFormComponent } from './app/new-form/new-form.component';
import { OverviewManagementComponent } from './app/overview-management/overview-management.component';

export const appRoutes: Routes = [
    { path: 'signup', component: SignupFormComponent, data: { animation: { value: 'signup' } } },
    { path: 'login', component: LoginFormComponent, data: { animation: { value: 'login' } } },
    { path: 'dash', component: DashComponent, data: { animation: { value: 'dash' } } },
    // { path: 'quote-form', component: QuoteFormComponent, data: { animation: { value: 'quote-form' } } },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'quote-management', component: QuoteManagementComponent, data: { animation: { value: 'quote-management' } } },
    { path: 'quote-preview/:quote_num', component: QuotePreviewComponent, data: { quote_num: '', animation: { value: 'quote-preview' } } },
    { path: 'new-form', component: NewFormComponent, data: { animation: { value: 'new-form' } } },
    { path: 'edit-form/:quote_num', component: NewFormComponent, data: { quote_num: '', animation: { value: 'edit-form' } } },
    // { path: 'form', component: QuoteFormComponent, data: { animation: { value: 'form' } } },
    { path: 'overview', component: OverviewManagementComponent, data: { animation: { value: 'overview' } } },

    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
