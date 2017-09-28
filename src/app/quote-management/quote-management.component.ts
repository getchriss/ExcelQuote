import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { QuoteService } from '../services/quote.service';
import { FirebaseListObservable } from 'angularfire2/database';

import { QuoteFile } from '../models/quote-file.model'

@Component({
  selector: 'app-quote-management',
  templateUrl: './quote-management.component.html',
  styleUrls: ['./quote-management.component.css']
})

export class QuoteManagementComponent implements OnInit, OnChanges {
  feed: FirebaseListObservable<QuoteFile[]>;


  constructor(private quoteFile: QuoteService) { }

  ngOnInit() {
    this.feed = this.quoteFile.getQuotes();
  }

  ngOnChanges() {
    this.feed = this.quoteFile.getQuotes();
  }

}
