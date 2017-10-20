import { Component, OnInit, OnChanges } from '@angular/core';
import { Routes } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { QuoteService } from '../services/quote.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { FADE_IN_ANIMATION } from '../_animations/fade_in.animation';

import { AuthService } from '../services/auth.service';
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
  compTitle = 'EXISTING QUOTES';

  displayName: string;
  userId: string;
  getUserData: any;
  userData: any = {};

  constructor(private quoteFile: QuoteService, private auth: AuthService ) {
    this.displayName = quoteFile.userData['displayName'];
    // console.log(this.displayName);
  }

  ngOnInit() {
    this.feed = this.quoteFile.getQuotes();
    this.feed.subscribe(snapshot => {
      const i = 0;
      snapshot.forEach(snapshots => {
        const tempKey = snapshots.$key;
        this.quoteArray.push(tempKey);
      });
    });
    this.quoteFile.getUser().subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.getUserData = this.auth.getUserData(this.userId);
        this.getUserData.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.userData[snapshot.key] = snapshot.val();
            this.displayName = this.userData['displayName'];
            console.log(this.displayName);
          });
        });
      }
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
    const filter = event.target.value.toLowerCase();
    const feed = document.getElementById('feed');
    const quotes = feed.getElementsByClassName('quote');
    for (let i = 0; i < quotes.length; i++) {
      const id = quotes[i].getElementsByClassName('quoteID')[0];
      const name = quotes[i].getElementsByClassName('quoteName')[0];
      if ((id && id.innerHTML.indexOf(filter) > -1) || (name && name.innerHTML.toLowerCase().indexOf(filter) > -1)) {
        if (quotes[i].classList.contains('hidden')) {
          quotes[i].classList.remove('hidden');
        }
      } else {
        quotes[i].classList.add('hidden');
      }
    }
  }

  searchQuotesTrigger(elmId) {
    const elm = <HTMLInputElement>document.getElementById(elmId);
    // console.log(elm);
    elm.value = '';
    const feed = document.getElementById('feed');
    const quotes = feed.getElementsByClassName('quote');
    for (let i = 0; i < quotes.length; i++) {
      const id = quotes[i].getElementsByClassName('quoteID')[0];
      const name = quotes[i].getElementsByClassName('quoteName')[0];
      // if ((id && id.innerHTML.indexOf(filter) > -1) || (name && name.innerHTML.toLowerCase().indexOf(filter) > -1)) {
        quotes[i].classList.remove('hidden');
      // }
    }
  }
}

