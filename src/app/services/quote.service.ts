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
    if (
        quote.client !== undefined ||
        quote.email !== undefined ||
        quote.address !== undefined ||
        quote.phone !== undefined ||
        quote.date !== undefined ||
        quote.userFile !== undefined ||
        quote.noKinds !== undefined ||
        quote.qKinds !== undefined ||
        quote.cost !== undefined ||
        quote.width !== undefined ||
        quote.height !== undefined ||
        quote.labelsPer !== undefined ||
        quote.gap !== undefined ||
        quote.knife !== undefined ||
        quote.charge !== undefined ||
        quote.stock !== undefined ||
        quote.color !== undefined ||
        quote.embel !== undefined ||
        quote.appliedBy !== undefined ||
        quote.adhesive !== undefined ||
        quote.overPrint !== undefined ||
        quote.core !== undefined ||
        quote.windStylev !== undefined ||
        quote.proofType !== undefined // ||
        // quote.addInfo !== undefined
      ) {  
        console.log(quote)
      // this.quoteFiles.push({
      //   client: quote.client,
      //   email: quote.email,
      //   address: quote.address,
      //   phone: quote.phone,
      //   date: quote.date,
      //   userFile: quote.userFile,
      //   noKinds: quote.noKinds,
      //   qKinds: quote.qKinds,
      //   cost: quote.cost,
      //   width: quote.width,
      //   height: quote.height,
      //   labelsPer: quote.labelsPer,
      //   gap: quote.gap,
      //   knife: quote.knife,
      //   charge: quote.charge,
      //   stock: quote.stock,
      //   color: quote.color,
      //   embel: quote.embel,
      //   appliedBy: quote.appliedBy,
      //   adhesive: quote.adhesive,
      //   overPrint: quote.overPrint,
      //   core: quote.core,
      //   windStyle: quote.windStyle,
      //   proofType: quote.proofType,
      //   addInfo: quote.addInfo
      // });
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
