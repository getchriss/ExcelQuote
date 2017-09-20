import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class FirebaseDatabaseService {

  constructor(private _http: Http) { }

}
