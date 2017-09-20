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
    console.log(quote)
    if (quote.client !== undefined) {  //set any required fields here. Any fields not needed will need to be defined above.
      this.quoteFiles.push({
        client: quote.client,
        email: quote.email,
        address: quote.address,
        phone: quote.phone,
        noKinds: quote.noKinds,
        qKinds: quote.qKinds,
        cost: quote.cost,
        width: quote.width,
        height: quote.height,
        labelsPer: quote.labelsPer,
        gap: quote.gap,
        knife: quote.knife,
        charge: quote.charge,
        stock: quote.stock
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

  getStocks(): FirebaseListObservable<QuoteFile[]> {
    return this.db.list('/misc/stock', {
      preserveSnapshot: true
    });
  }

  getFinishes(): FirebaseListObservable<QuoteFile[]> {
    return this.db.list('/misc/finish', {
      preserveSnapshot: true
    });
  }

  getEmbelishment(): FirebaseListObservable<QuoteFile[]> {
    return this.db.list('/misc/embelishment', {
      preserveSnapshot: true
    });
  }

  getAdhesive(): FirebaseListObservable<QuoteFile[]> {
    return this.db.list('/misc/adhesive', {
      preserveSnapshot: true
    });
  }
}
