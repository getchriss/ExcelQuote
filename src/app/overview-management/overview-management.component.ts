import { Component, OnInit, OnChanges } from '@angular/core';
import { Routes } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import { QuoteService } from '../services/quote.service';
import { FirebaseListObservable } from 'angularfire2/database';
// import {RouteParams} from '@angular/router';
// import { trigger, style, transition, animate, keyframes, query, stagger, animateChild, state } from '@angular/animations';
// import { FADE_IN_LEFT_ANIMATION } from '../_animations/fade_in_out.animation'
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { QuoteFile } from '../models/quote-file.model'

@Component({
  selector: 'app-overview-management',
  templateUrl: './overview-management.component.html',
  styleUrls: ['./overview-management.component.css']
  // animations: [FADE_IN_LEFT_ANIMATION]
})

export class OverviewManagementComponent implements OnInit {
  compTitle = 'QUOTES OVERVIEW';
  feed: FirebaseListObservable<QuoteFile[]>;
  focusThumb: string;

  feedLength;

  constructor(private quoteFile: QuoteService) {
    this.feed = this.quoteFile.getQuotes();
    this.feed.subscribe(
      val => { this.feedLength = val.length }
    )
    // console.log(this.feed.last)
  }

  ngOnInit() {
  }

  toggleFocus(event, key) {
    if (this.focusThumb != key) {
      this.focusThumb = key;
    } else if (key == undefined || key == null || key == '') {
      this.focusThumb = ''
    }
  }

}
