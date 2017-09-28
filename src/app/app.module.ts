import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MdButtonModule,  MdToolbarModule, MdIconModule, MdDialogModule, MdInputModule, MdCheckboxModule,
  MdGridListModule, MdCardModule, MdSlideToggleModule, MdDatepickerModule, MdNativeDateModule,
  MdButtonToggleModule, MdSelectModule, MdSnackBarModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LocalStorageModule } from 'angular-local-storage'

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { DashComponent } from './dash/dash.component';
import { NavbarComponent } from './navbar/navbar.component';
import { QuoteManagementComponent } from './quote-management/quote-management.component';
import { QuotePreviewComponent } from './quote-preview/quote-preview.component';
import { QuoteFormComponent } from './quote-form/quote-form.component';

import { AuthService } from './services/auth.service';
import { QuoteService } from './services/quote.service';
import { NotifyService } from './services/notify.service';
import { FirebaseDatabaseService } from './services/firebase-database.service';

import { appRoutes } from '../routes';
import { environment } from '../environments/environment';
import { NewFormComponent } from './new-form/new-form.component';
import { NavfooterComponent } from './navfooter/navfooter.component';
import { QuoteThumbnailComponent } from './quote-thumbnail/quote-thumbnail.component';


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
    NewFormComponent,
    NavfooterComponent,
    QuoteThumbnailComponent,
  ],

  imports: [
    BrowserModule,
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
  ],
  providers: [AuthService, QuoteService, NotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
