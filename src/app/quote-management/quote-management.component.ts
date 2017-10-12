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
  quoteArray = [];
  compTitle = 'QUOTE MANAGEMENT';

  constructor(private quoteFile: QuoteService) { }

  ngOnInit() {
    this.feed = this.quoteFile.getQuotes();
    this.feed.subscribe(snapshot => {
      let i = 0;
      snapshot.forEach(snapshots => {
        const tempKey = snapshots.$key;
        this.quoteArray.push(tempKey);
      });
    });
  }

  ngOnChanges() { }

  toggleFocus(event, key) {
    if (this.focusThumb !== key) {
      this.focusThumb = key;
    } else if (key === undefined || key === null || key === '') {
      this.focusThumb = '';
    }
  }

  searchQuotes(event) {
    const input = document.getElementById('searchbar');
    const filter = event.target.value;
    const feed = document.getElementById('feed');
    const quotes = feed.getElementsByClassName('quote');
    console.log('pain');
    for (let i = 0; i < quotes.length; i++) {
      const id = quotes[i].getElementsByClassName('quoteID')[0];
      if (id && id.innerHTML.indexOf(filter) > -1) {
        if (quotes[i].classList.contains('hidden')) {
          quotes[i].classList.remove('hidden');
        }
      } else {
        quotes[i].classList.add('hidden');
      }
    }
  }

}
