import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SignupFormComponent {

  email: string;
  password: string;
  displayName: string;
  errorMsg: string;

  constructor(private authService: AuthService, private router: Router) { }

  globalFormControl = new FormControl('', [
    Validators.required]);

  signUp() {
    // console.log("signing up...")
    const email = this.email;
    const password = this.password;
    const displayName = this.displayName;
    this.authService.signUp(email, password, displayName)
      .then(resolve => console.log('success!'))
      .catch( error => this.errorMsg = error.message);
  }
}
