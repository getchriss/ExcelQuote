import { Component, OnInit, OnChanges } from '@angular/core';
import { Routes } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { QuoteService } from '../services/quote.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { FADE_IN_ANIMATION } from '../_animations/fade_in.animation';

import { QuoteFile } from '../models/quote-file.model';

@Component({
  selector: 'app-quote-management',
  templateUrl: './quote-management.component.html',
  styleUrls: ['./quote-management.component.css'],
  animations: [FADE_IN_ANIMATION]
})

export class QuoteManagementComponent implements OnInit, OnChanges {
  feed: FirebaseListObservable<QuoteFile[]>;
  focusThumb: string;

  constructor(private quoteFile: QuoteService) { }

  ngOnInit() {
    this.feed = this.quoteFile.getQuotes();
  }

  ngOnChanges() { }

  toggleFocus(event, key) {
    if (this.focusThumb !== key) {
      this.focusThumb = key;
    } else if (key === undefined || key === null || key === '') {
      this.focusThumb = '';
    }
  }

}
