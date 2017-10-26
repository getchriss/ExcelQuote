import { Injectable, ViewContainerRef, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { MatSnackBar, MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition } from '@angular/material';

import { LogServiceService } from '../services/log-service.service';

import { Http, HttpModule, Headers, Response, RequestOptions } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  authState: any;
  private userName: string;
  private login_error: string;
  rememberMe: true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router, private snackBar: MatSnackBar ) {
    this.user = afAuth.authState;
  }

  authUser() {
    return this.user;
  }

  resetPassword(email: string) {
    const auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error));
  }

  get currentUserId(): string {
    console.log(this.authState.uid);
    // return this.authState !== null ? this.authState.uid : '';
    return ' ';
  }

  login(email: string, password: string) {
    if (email === undefined) {
      email = '';
    }

    if (password === undefined) {
      password = '';
    }

    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = 3000;
    config.extraClasses = ['snackColorSuccess'];
    const elm = <HTMLElement>document.getElementById('spinner');
    const loginText = <HTMLElement>document.getElementById('loginText');
    console.log(elm);
    loginText.classList.add('hidden');
    elm.classList.remove('hidden');
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        this.authState = user;
        this.setUserStatus('online');
        this.router.navigate(['dash']);
        this.snackBar.open(`Sign in Successful`, '', config);
        loginText.classList.remove('hidden');
        elm.classList.add('hidden');
        console.log('Successful login');
      })
      .catch((error: firebase.FirebaseError) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        config.extraClasses = ['snackColor'];
        if (error.code === 'auth/invalid-email') {
          this.snackBar.open(`Incorrect email or password`, '', config);
          loginText.classList.remove('hidden');
          elm.classList.add('hidden');
        }  else if (error.code === 'auth/wrong-password') {
          this.snackBar.open(`Incorrect password`, '', config);
          loginText.classList.remove('hidden');
          elm.classList.add('hidden');
        } else if (error instanceof HttpErrorResponse) {
          loginText.classList.remove('hidden');
          elm.classList.add('hidden');
        }  else if (error instanceof Error) {
          loginText.classList.remove('hidden');
          elm.classList.add('hidden');
        } else {
          loginText.classList.remove('hidden');
          elm.classList.add('hidden');
        }
      })
      .catch((function (error) {
      console.log(error);
      loginText.classList.remove('hidden');
      elm.classList.add('hidden');
    }));
  }

  toggleEditable(e: Event) {
      const token = localStorage.getItem('savedToken');
    }

  logout() {
    // console.log(this.afAuth.auth);
      // .then((user) => {
    // console.log(this.afAuth.auth);
    // this.setUserStatus('offline');
    this.router.navigate(['login']);
    this.afAuth.auth.signOut();
      // });
  }

  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const config = new MatSnackBarConfig();
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = 1500;
        config.extraClasses = ['snackColorSuccess'];
        this.authState = user;
        const status = 'online';
        const type = 'user';
        this.setUserData(email, displayName, type, status);
        this.snackBar.open(`Registration Successful!`, '', config);
        this.router.navigate(['login']);
        return true;
      })
      .catch((error: firebase.FirebaseError) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const config = new MatSnackBarConfig();
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = 3000;
        config.extraClasses = ['snackColor'];
        config.extraClasses = ['snackColor'];
        if (error.code === 'auth/invalid-email') {
          return this.snackBar.open(`Please enter a valid email address`, '', config);
        } else if (error.code === 'auth/weak-password') {
          return this.snackBar.open(`Please use at least 6 characters for your password`, '', config);
        }
      });
  }

  setUserData(email: string, displayName: string, type: string, status: string): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      email: email,
      displayName: displayName,
      type: type,
      status: status
    };

    this.db.object(path).update(data)
      .catch(error => console.log());
  }

  getUserData(uid: string) {
    return this.db.list('/users/' + uid, { preserveSnapshot: true });
  }

  setUserStatus(status: string): void {
    const path = `users/${this.currentUserId}`;

    const data = {
      status: status
    };

    this.db.object(path).update(data)
      .catch(error => console.log());
  }
}
