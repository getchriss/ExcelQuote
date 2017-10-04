import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

import { QuoteFile } from '../models/quote-file.model'

@Injectable()
export class QuoteService {
  user: any;
  quoteFiles: FirebaseListObservable<QuoteFile[]>;
  quoteFile: QuoteFile;
  userName: Observable<string>;
  quoteNumbers = [];

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
      quote.phone !== undefined &&
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
      quote.orient.length > 0 &&
      quote.appliedBy.length > 0 &&
      quote.adhesive.length > 0 &&
      quote.overPrint.length > 0 &&
      quote.core !== undefined &&
      quote.windStyle !== undefined &&
      quote.supplied.length > 0 &&
      quote.proofType.length > 0
    ) {
      // console.log('validateQuote() was successful...')
      return true;
    } else {
      // console.log('validateQuote() was not successful...')
      console.log(quote.client.length)
      console.log(quote.email.length)
      console.log(quote.address.length)
      console.log(quote.phone !== undefined)
      console.log(quote.date !== undefined)
      console.log(quote.userFileName !== undefined)
      console.log(quote.noKinds !== undefined)
      console.log(quote.qKinds !== undefined)
      console.log(quote.cost.length)
      console.log(quote.width !== undefined)
      console.log(quote.height !== undefined)
      console.log(quote.labelsPer !== undefined)
      console.log(quote.gap !== undefined)
      console.log(quote.knife.length)
      console.log(quote.charge.length)
      console.log(quote.stock.length)
      console.log(quote.color.length)
      console.log(quote.embel.length)
      console.log(quote.orient.length)
      console.log(quote.appliedBy.length)
      console.log(quote.adhesive.length)
      console.log(quote.overPrint.length)
      console.log(quote.core !== undefined)
      console.log(quote.windStyle !== undefined)
      console.log(quote.supplied.length)
      console.log(quote.proofType.length)
      return false;
    }
  }

  submitQuote(quote: any, quoteNum: string) {
    this.quoteFiles = this.getQuotes();
    let quoteFile = {
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
      orient: quote.orient,
      appliedBy: quote.appliedBy,
      adhesive: quote.adhesive,
      overPrint: quote.overPrint,
      core: quote.core,
      windStyle: quote.windStyle,
      suppliedIn: quote.supplied,
      proofType: quote.proofType,
      addInfo: quote.addInfo,
      stage: 'requested'
    };
    this.quoteFiles.update(quoteNum, quoteFile);

    console.log('Completed submitQuote()...')
  }

  getQuotes(): FirebaseListObservable<QuoteFile[]> {
    return this.db.list('/quotes');
  }

  getQuoteById(id) {
    return this.db.list('/quotes/' + id, { preserveSnapshot: true });
  }
  
  getQuoteNumbers() {
    return this.db.list('/quotes/', { preserveSnapshot: true })
  }

  getStocks(): FirebaseListObservable<QuoteFile[]> {
    return this.db.list('/misc/stock', {
      preserveSnapshot: true
    })
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

  updateStage(id:string, stageName:string) {
    const temp =  this.getQuoteById(id);

    // console.log(temp)
    temp.set('stage', stageName);
  }
}
