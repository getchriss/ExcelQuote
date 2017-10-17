import { Component, OnInit, OnChanges } from '@angular/core';
import { Routes } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { QuoteService } from '../services/quote.service';

import { FirebaseListObservable } from 'angularfire2/database';

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
  // acol = Observable<firebase.User>;

  feedLength;

  constructor(private quoteFile: QuoteService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.feed = this.quoteFile.getQuotes();
    this.feed.subscribe(
      val => {
        this.feedLength = val.length;
      }
    );
  }

  ngOnInit() {
  }

  claim() {
    // const config = new MatSnackBarConfig();
    // config.verticalPosition = this.verticalPosition;
    // config.horizontalPosition = this.horizontalPosition;
    // config.duration = 1000;
    // config.extraClasses = ['snackColorSuccess'];
    this.dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = 'Please <b>confirm</b> to claim this quote';
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.snackBar.open(`quote claimed! `, '', config);
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
