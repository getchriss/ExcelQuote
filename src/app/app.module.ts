import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule,  MdToolbarModule, MdIconModule, MdDialogModule, MdInputModule, MdCheckboxModule } from '@angular/material';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { DashComponent } from './dash/dash.component';
import { NavbarComponent } from './navbar/navbar.component';
import { QuoteManagementComponent } from './quote-management/quote-management.component';
import { QuotePreviewComponent } from './quote-preview/quote-preview.component';
import { QuoteFormComponent } from './quote-form/quote-form.component';
// import { HTTP_PROVIDERS } from '@angular/http';

import { AuthService } from './services/auth.service';
import { QuoteService } from './services/quote.service';
import { FirebaseDatabaseService } from './services/firebase-database.service';

import { appRoutes } from '../routes';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignupFormComponent,
    NavbarComponent,
    DashComponent,
    QuoteManagementComponent,
    QuotePreviewComponent,
    QuoteFormComponent,
  ],

  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    MdButtonModule,
    MdToolbarModule,
    MdIconModule,
    MdDialogModule,
    MdInputModule,
    MdCheckboxModule,
  ],
  providers: [AuthService, QuoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
