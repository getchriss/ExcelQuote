import { ErrorHandler, Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AuthService } from '../services/auth.service';

@Injectable()
export class LogServiceService {
  private name: String = 'logService';

  constructor() {}

  logService(error: any) {
    if (error instanceof HttpErrorResponse) {
      console.error('There was an HTTP error.', error.message, 'Status code:', (<HttpErrorResponse>error).status);
    } else if (error instanceof TypeError) {
      console.error('There was a Type error.', error.message);
    } else if (error instanceof Error) {
      console.error('There was a general error.', error.message);
    }  else {
      console.error('ghost error but something happened!', error);
    }
  }
}
