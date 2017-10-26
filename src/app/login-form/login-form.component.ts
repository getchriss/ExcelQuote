import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
  // encapsulation: ViewEncapsulation.Emulated
})

export class LoginFormComponent {
  email: string;
  password: string;
  errorMsg: any;
  passReset = false;
  rememberMe = false;
  private name: String = 'logService';
  // @localStorage() public email: string = '';
  // @localStorage() public rememberMe: boolean = false;

  constructor(private authService: AuthService, private router: Router,
    private snackBar: MatSnackBar) { }

    globalFormControl = new FormControl('', [
      Validators.required]
    );

  login() {
    console.log('login() called from login-form component');
    this.authService.login(this.email, this.password);
    // if (login === true) {
      // console.log('It worked');
    // } else {
      // const elm = <HTMLElement>document.getElementById('spinner');
      // elm.classList.remove('hidden');
      // console.log(':( *sad emoji*');
    // }
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.login();
    }
  }

  toggleEditable(e: Event) {
    if (this.rememberMe === true) {
      // Do a thing
      console.log('toggle set to false!');
      this.rememberMe = false;
    } else {
      // Do another thing
      console.log('toggle set to true!');
      this.rememberMe = true;
    }
  }

  resetPassword() {
    this.authService.resetPassword(this.email)
      .then(() => this.passReset = true);
  }
}
