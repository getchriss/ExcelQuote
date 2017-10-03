import { Component, OnInit, OnChanges } from '@angular/core';
import { Routes } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import { QuoteService } from '../services/quote.service';
import { FirebaseListObservable } from 'angularfire2/database';
// import {RouteParams} from '@angular/router';

import { QuoteFile } from '../models/quote-file.model'

@Component({
  selector: 'app-overview-management',
  templateUrl: './overview-management.component.html',
  styleUrls: ['./overview-management.component.css']
})
export class OverviewManagementComponent implements OnInit {
  compTitle = 'QUOTES OVERVIEW';
  private feed: FirebaseListObservable<QuoteFile[]>;
  private focusThumb: string;

  constructor(private quoteFile: QuoteService) {  }

  ngOnInit() {
    this.feed = this.quoteFile.getQuotes();
  }

  toggleFocus(event, key) {
    if (this.focusThumb != key) {
      this.focusThumb = key;
    } else if (key == undefined || key == null || key == '') {
      this.focusThumb = ''
    }
  }

}
