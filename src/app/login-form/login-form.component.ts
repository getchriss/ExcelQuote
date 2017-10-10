import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MdTabsModule } from '@angular/material';

import { AuthService } from '../services/auth.service';
import { NotifyService } from '../services/notify.service';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

  constructor(private authService: AuthService, private router: Router, private NotifyService: NotifyService) { }

  globalFormControl = new FormControl('', [
    Validators.required]
  );

  login() {
    console.log('login() called from login-form component');
    this.authService.login(this.email, this.password);
  }

  resetPassword() {
    this.authService.resetPassword(this.email)
      .then(() => this.passReset = true);
  }
}
