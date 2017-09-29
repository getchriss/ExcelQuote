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

  validateQuote(quote: any) {
    if (
      quote.client.length > 0 &&
      quote.email.length > 0 &&
      quote.address.length > 0 &&
      quote.phone.length > 0 &&
      quote.date !== undefined &&
      quote.userFileName !== undefined &&
      quote.noKinds !== undefined &&
      quote.qKinds !== undefined &&
      quote.cost.length > 0 &&
      quote.width !== undefined &&
      quote.height !== undefined &&
      quote.labelsPer !== undefined &&
      quote.gap !== undefined &&
      quote.knife.length > 0 &&
      quote.charge.length > 0 &&
      quote.stock.length > 0 &&
      quote.color.length > 0 &&
      quote.embel.length > 0 &&
      quote.appliedBy.length > 0 &&
      quote.adhesive.length > 0 &&
      quote.overPrint.length > 0 &&
      // quote.core.length > 0 && // Not yet added to form. Uncomment when added
      // quote.windStyle.length > 0 && // Not yet added to form. Uncomment when added
      quote.supplied.length > 0 &&
      quote.proofType.length > 0
    ) {
      console.log('validateQuote() was successful...')
      return true;
    } else {
      console.log('validateQuote() was not successful...')
      console.log(quote)
      // console.log('client: ' + quote.client.length);
      // console.log('email: ' + quote.email.length);
      // console.log('address: ' + quote.address.length)
      // console.log('phone: ' + quote.phone.length)
      // console.log('date: ' + quote.date);
      // console.log('user file name: ' + quote.userFileName)
      // console.log('# of kinds: ' + quote.noKinds)
      // console.log('quantity per kind: ' + quote.qKinds)
      // console.log('cost: ' + quote.cost.length)
      // console.log('width: ' + quote.width)
      // console.log('height: ' + quote.height)
      // console.log('labels per roll: ' + quote.labelsPer)
      // console.log('gap: ' + quote.gap.length)
      // console.log('knife: ' + quote.knife.length)
      // console.log('charge: ' + quote.charge.length)
      // console.log('stock: ' + quote.stock.length)
      // console.log('color: ' + quote.color.length)
      // console.log('embelishments ' + quote.embel.length)
      // console.log('applied by: ' + quote.appliedBy.length)
      // console.log('adhesive: ' + quote.adhesive.length)
      // console.log('over print: ' + quote.overPrint.length)
      // console.log('supplied in: ' + quote.supplied.length)
      // console.log('proof type: ' + quote.proofType.length)
      return false;
    }
  }

  submitQuote(quote: any) {
    this.quoteFiles = this.getQuotes();
    this.quoteFiles.push({
      client: quote.client,
      email: quote.email,
      address: quote.address,
      phone: quote.phone,
      date: quote.date,
      fileName: quote.userFileName,
      noKinds: quote.noKinds,
      qKinds: quote.qKinds,
      cost: quote.cost,
      width: quote.width,
      height: quote.height,
      labelsPer: quote.labelsPer,
      gap: quote.gap,
      knife: quote.knife,
      charge: quote.charge,
      stock: quote.stock,
      colour: quote.color,
      embel: quote.embel,
      appliedBy: quote.appliedBy,
      adhesive: quote.adhesive,
      overPrint: quote.overPrint,
      // core: quote.core,
      // windStyle: quote.windStyle,
      suppliedIn: quote.supplied,
      proofType: quote.proofType,
      addInfo: quote.addInfo
    });
    console.log('Completed submitQuote()...')
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


  getClient(): FirebaseListObservable<QuoteFile[]> {
    return this.db.list('/quotes', {      
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
