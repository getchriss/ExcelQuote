import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

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
  rememberMe: false;

  constructor(private authService: AuthService, private router: Router,
    public dialog: MdDialog) { }

  globalFormControl = new FormControl('', [
    Validators.required]
  );

  login() {
    console.log('login() called from login-form component');
    this.authService.login(this.email, this.password);
  }

  toggleEditable() {
    console.log('token saved');
  }
  
  handleSubmit(event) {
    if(event.keyCode === 13) {
      this.login();
    }
  }

  resetPassword() {
    this.authService.resetPassword(this.email)
      .then(() => this.passReset = true);
  }
}
