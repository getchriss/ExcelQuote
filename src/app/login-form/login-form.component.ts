import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MdSnackBar, MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})

export class LoginFormComponent {
  email: string;
  password: string;
  errorMsg: any;
  passReset = false;
  isChecked = false;
  cookieValue = 'UNKNOWN';
  // @localStorage() public email: string = '';
  // @localStorage() public rememberMe: boolean = false;

  constructor(private authService: AuthService, private router: Router,
    public dialog: MdDialog, private cookieService: CookieService) { }

  globalFormControl = new FormControl('', [
    Validators.required]
  );

  login() {
    console.log('login() called from login-form component');
    this.authService.login(this.email, this.password);
  }

  toggleEditable(e: Event) {
    if (this.isChecked === true) {
      // Do a thing
      console.log('toggle set to false!');
      this.isChecked = false;
      this.cookieService.deleteAll();
    } else {
      // Do another thing
      console.log('toggle set to true!');
      this.isChecked = true;
      this.cookieService.set('TestCookie', 'Hello im a cookie nom nom nom nom');
      this.cookieValue = this.cookieService.get('Test');
    }
  }


  resetPassword() {
    this.authService.resetPassword(this.email)
      .then(() => this.passReset = true);
  }
}
