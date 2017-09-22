import { Injectable } from '@angular/core';
import { MdSnackBar, MdSnackBarRef } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class NotifyService {

  constructor(public snackBar: MdSnackBar) { }

  // notify(message: string, action: string, duration: number) {
  //   return this.snackBar.open(message, action, { duration });
  // }

  // notifyAction(notification: MdSnackBarRef<any>, next) {
  //   return notification.onAction().subscribe(() => next()); 
  // }

}