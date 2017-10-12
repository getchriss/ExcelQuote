import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private authState: any;
  private userName: string;
  private login_error: string;
  rememberMe: true;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router, private snackBar: MdSnackBar, ) {
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
    return this.authState !== null ? this.authState.uid : '';
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
        this.authState = user;
        this.setUserStatus('online');
        this.router.navigate(['dash']);
      })
      .catch((error: firebase.FirebaseError) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (error.code === 'auth/invalid-email') {
          return this.snackBar.open(`Incorrect email or password`, '', { duration: 99999 });
        } else if (error.code === 'auth/wrong-password') {
          return this.snackBar.open(`Incorrect password`, '', { duration: 99999 });
        }
      })
      .catch((function (error) {
        console.log(error);
      }));
  }

  toggleEditable(e: Event) {
      const token = localStorage.getItem('savedToken');
    }

  logout() {
    this.setUserStatus('offline');
    this.router.navigate(['login']);
    this.afAuth.auth.signOut();
  }

  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        const status = 'online';
        const type = 'user';
        this.setUserData(email, displayName, type, status);
      }
      )
      .catch((error: firebase.FirebaseError) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`code`, error.code);
        console.log(`message`, error.message);
        console.log(`name`, error.name);
        console.log(`stack`, error.stack);
      }
      );
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
      .catch(error => console.log(error));
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
      .catch(error => console.log(error));
  }
}
