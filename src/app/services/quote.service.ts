import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

import { QuoteFile } from '../models/quote-file.model';

import { MatSnackBar, MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';

@Injectable()
export class QuoteService {
  user: any;
  quoteFiles: FirebaseListObservable<QuoteFile[]>;
  quoteFile: QuoteFile;
  userName: Observable<string>;
  quoteNumbers = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
    });
  }

  validateQuote(quote: any) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = 2500;
    config.extraClasses = ['snackColor'];
    if (
      quote.client.length > 0 &&
      quote.email.length > 0 &&
      quote.address.length > 0 &&
      quote.phone !== undefined &&
      quote.date !== undefined &&
      // quote.fileName !== undefined &&
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
      quote.colour.length > 0 &&
      quote.finish.length > 0 &&
      quote.embel.length > 0 &&
      quote.orient.length > 0 &&
      quote.appliedBy.length > 0 &&
      quote.adhesive.length > 0 &&
      quote.overPrint.length > 0 &&
      quote.core !== undefined &&
      quote.windStyle !== undefined &&
      quote.suppliedIn.length > 0 &&
      quote.proofType.length > 0
    ) {
      console.log('validateQuote() was successful...');
      return true;
    } else if (quote.client.length === 0) {
      return this.snackBar.open(`Please supply client name`, '', config);
    } else if (quote.email.length === 0 ) {
      return this.snackBar.open(`Please supply an email address`, '', config);
    } else if (quote.address.length === 0) {
      return this.snackBar.open(`Please supply an address`, '', config);
    } else if (quote.phone === undefined) {
      return this.snackBar.open(`Please supply a phone number`, '', config);
    } else if (quote.date === undefined) {
      return this.snackBar.open(`Please specify date required`, '', config);
    } else if (quote.noKinds === undefined) {
      return this.snackBar.open(`Please specify number of kinds`, '', config);
    } else if (quote.qKinds === undefined) {
      return this.snackBar.open(`Please specify quantity per kind`, '', config);
    } else if (quote.cost.length === 0) {
      return this.snackBar.open(`Please specify delivery costs`, '', config);
    } else if (quote.width === undefined) {
      return this.snackBar.open(`Please specify width`, '', config);
    } else if (quote.height === undefined) {
      return this.snackBar.open(`Please specify height`, '', config);
    } else if (quote.labelsPer === undefined) {
      return this.snackBar.open(`Please specify how many labels per`, '', config);
    } else if (quote.gap === undefined) {
      return this.snackBar.open(`Please specify gap between labels`, '', config);
    } else if (quote.knife.length === 0) {
      return this.snackBar.open(`Please specify knife type`, '', config);
    } else if (quote.charge.length === 0) {
      return this.snackBar.open(`Please specify charges`, '', config);
    } else if (quote.stock.length === 0) {
      return this.snackBar.open(`Please select stock type`, '', config);
    } else if (quote.colour.length === 0) {
      return this.snackBar.open(`Please specify color style`, '', config);
    } else if (quote.finishes.length === 0) {
      return this.snackBar.open(`Please specify finish style(s)`, '', config);
    } else if (quote.embel.length === 0) {
      return this.snackBar.open(`Please select embelishment style`, '', config);
    } else if (quote.orient.length === 0) {
      return this.snackBar.open(`Please select a orientation`, '', config);
    } else if (quote.appliedBy.length === 0) {
      return this.snackBar.open(`Please specify label application type`, '', config);
    } else if (quote.adhesive.length === 0) {
      return this.snackBar.open(`Please specify an adhesive`, '', config);
    } else if (quote.overPrint.length === 0) {
      return this.snackBar.open(`Please select overprint option`, '', config);
    } else if (quote.core === undefined) {
      return this.snackBar.open(`Please specify a core size`, '', config);
    } else if (quote.windStyle === undefined) {
      return this.snackBar.open(`Please specify a winding style`, '', config);
    } else if (quote.suppliedIn.length === 0) {
      return this.snackBar.open(`Plase specify how labels are supplied`, '', config);
    } else if (quote.proofType.length === 0) {
      return this.snackBar.open(`Please specify proof type`, '', config);
    } else {
      console.log('validateQuote() was not successful...');
      console.log(quote.client.length);
      console.log(quote.email.length);
      console.log(quote.address.length);
      console.log(quote.phone !== undefined);
      console.log(quote.date !== undefined);
      console.log(quote.fileName !== undefined);
      console.log(quote.noKinds !== undefined);
      console.log(quote.qKinds !== undefined);
      console.log(quote.cost.length);
      console.log(quote.width !== undefined);
      console.log(quote.height !== undefined);
      console.log(quote.labelsPer !== undefined);
      console.log(quote.gap !== undefined);
      console.log(quote.knife.length);
      console.log(quote.charge.length);
      console.log(quote.stock.length);
      console.log(quote.colour.length);
      console.log(quote.embel.length);
      console.log(quote.orient.length);
      console.log(quote.appliedBy.length);
      console.log(quote.adhesive.length);
      console.log(quote.overPrint.length);
      console.log(quote.core !== undefined);
      console.log(quote.windStyle !== undefined);
      console.log(quote.suppliedIn.length);
      console.log(quote.proofType.length);
      return false;
    }
  }

  submitQuote(quote: any, quoteNum: string) {
    this.quoteFiles = this.getQuotes();
    const quoteFile = {
      client: quote.client,
      email: quote.email,
      address: quote.address,
      phone: quote.phone,
      date: quote.date,
      fileName: quote.fileName,
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
      colour: quote.colour,
      finish: quote.finish,
      embel: quote.embel,
      orient: quote.orient,
      appliedBy: quote.appliedBy,
      adhesive: quote.adhesive,
      overPrint: quote.overPrint,
      core: quote.core,
      windStyle: quote.windStyle,
      suppliedIn: quote.suppliedIn,
      proofType: quote.proofType,
      addInfo: quote.addInfo,
      stage: 'requested'
    };
    this.quoteFiles.update(quoteNum, quoteFile);

    console.log('Completed submitQuote()...');
  }

  getQuotes(): FirebaseListObservable<QuoteFile[]> {
    return this.db.list('/quotes');
  }

  getQuoteById(id) {
    return this.db.list('/quotes/' + id, { preserveSnapshot: true });
  }

  getQuoteNumbers() {
    return this.db.list('/quotes/', { preserveSnapshot: true });
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

  updateStage(id: string, stageName: string) {
    const temp =  this.getQuoteById(id);
    temp.set('stage', stageName);
  }
}
