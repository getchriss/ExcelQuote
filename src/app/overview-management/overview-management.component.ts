import { Component, OnInit, OnChanges } from '@angular/core';
import { Routes, ActivatedRoute, Params } from '@angular/router';
import { QuoteService } from '../services/quote.service';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs/Subscription';

import { QuoteFile } from '../models/quote-file.model';
import { MatDialog, MatDialogRef, MatSnackBar,
        MatSnackBarConfig,
        MatSnackBarHorizontalPosition,
        MatSnackBarVerticalPosition  } from '@angular/material';

import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-overview-management',
  templateUrl: './overview-management.component.html',
  styleUrls: ['./overview-management.component.css']
})

export class OverviewManagementComponent implements OnInit {
  compTitle = 'QUOTES OVERVIEW';

  feed: FirebaseListObservable<QuoteFile[]>;
  focusThumb: string;
  dialogRef: MatDialogRef<ConfirmComponent>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  user: Observable<firebase.User>;
  displayName: string;
  userId: string;
  getUserData: any;
  userData: any = {};
  quoteOwner: string;
  key;
  claimed = false;

  feedLength;

  quotes;
  getQuote;

  constructor(private quoteFile: QuoteService,
              private quoteService: QuoteService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private authService: AuthService,
              private db: AngularFireDatabase) {
              this.feed = this.quoteFile.getQuotes();
    this.feed.subscribe(
      val => {
        this.feedLength = val.length;
      }
    );
  }

  ngOnInit() {
    this.user = this.authService.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.getUserData = this.authService.getUserData(this.userId);
        this.getUserData.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.userData[snapshot.key] = snapshot.val();
          });
        });
      }
    });
  }

  claim(id) {
    console.log(id);
    this.dialogRef = this.dialog.open(ConfirmComponent, {
    });
    this.dialogRef.componentInstance.confirmMessage = 'Please <b>confirm</b> to claim this quote';
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getQuote = this.quoteService.getQuoteById(id);
        console.log(id);
        this.quoteOwner = this.userData.displayName;
        this.quoteService.updateQuoteOwner(id, this.userData.displayName);
        console.log(this.quoteOwner);
      }
        this.dialogRef = null;
      });
    }

  toggleFocus(event, key) {
    if (this.focusThumb !== key) {
      this.focusThumb = key;
    } else if (key === undefined || key === null || key === '') {
      this.focusThumb = '';
    }
  }
}
