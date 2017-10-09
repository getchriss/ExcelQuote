import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MdButtonModule,  MdToolbarModule, MdIconModule, MdDialogModule, MdInputModule, MdCheckboxModule,
  MdGridListModule, MdCardModule, MdSlideToggleModule, MdDatepickerModule, MdNativeDateModule,
  MdButtonToggleModule, MdSelectModule, MdSnackBarModule, MdTabsModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { AuthService } from './services/auth.service';
import { QuoteService } from './services/quote.service';
import { NotifyService } from './services/notify.service';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';
import { LogServiceService } from './services/log-service.service';
import { FirebaseDatabaseService } from './services/firebase-database.service';

import { appRoutes } from '../routes';
import { environment } from '../environments/environment';

import { NewFormComponent } from './new-form/new-form.component';
import { NavfooterComponent } from './navfooter/navfooter.component';

import { OverviewManagementComponent } from './overview-management/overview-management.component';
import { ConfirmComponent } from './confirm/confirm.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignupFormComponent,
    NavbarComponent,
    DashComponent,
    QuoteManagementComponent,
    QuotePreviewComponent,
    NewFormComponent,
    NavfooterComponent,
    OverviewManagementComponent,
    ConfirmComponent,
  ],

  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
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
    MdGridListModule,
    MdCardModule,
    MdSlideToggleModule,
    MdDatepickerModule,
    MdNativeDateModule,
    FlexLayoutModule,
    MdButtonToggleModule,
    MdSelectModule,
    MdSnackBarModule,
    MdTabsModule,
  ],
  // exports: [ClipboardDirective],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    // GlobalErrorHandlerService,
    LogServiceService,
    AuthService,
    QuoteService,
    NotifyService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmComponent]
})
export class AppModule { }
