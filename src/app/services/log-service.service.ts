import { ErrorHandler, Injectable } from '@angular/core';

import { Http, HttpModule, Headers, Response, RequestOptions } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class LogServiceService {
  private name: String = 'logService';

  constructor() {}

  logService(error: any) {
    // const loginText = <HTMLElement>document.getElementById('loginText');
    if (error instanceof HttpErrorResponse) {
      console.error('There was an HTTP error.', error.message, 'Status code:', (<HttpErrorResponse>error).status);
      // loginText.classList.remove('hidden');
    } else if (error instanceof TypeError) {
      console.error('There was a Type error.', error.message);
      // loginText.classList.remove('hidden');
    } else if (error instanceof Error) {
      console.error('There was a general error.', error.message);
      // loginText.classList.remove('hidden');
      } else {
      console.error('ghost error but something happened!', error);
      // loginText.classList.remove('hidden');
    }
  }
}
