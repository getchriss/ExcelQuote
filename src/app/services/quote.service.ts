import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

import { QuoteFile } from '../models/quote-file.model'

@Injectable()
export class QuoteService {
  user: any;
  quoteFiles: FirebaseListObservable<QuoteFile[]>;
  quoteFile: QuoteFile;
  userName: Observable<string>;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
    });
  }

  sendQuote(quote: any) {
    this.quoteFiles = this.getQuotes();
    if (quote.client !== undefined) {  //set any required fields here. Any fields not needed will need to be defined above.
      this.quoteFiles.push({
        client: quote.client,
        email: quote.email,
        address: quote.address,
        addressCont: quote.addressCont,
        phone: quote.phone
      });
      console.log('Called sendQuote()...')
    } else {
      console.log('Error')
    }
  }

  getQuotes(): FirebaseListObservable<QuoteFile[]> {
    return this.db.list('/quotes', {
      query: {
        limitToLast: 10
      }
    });
  }

}
