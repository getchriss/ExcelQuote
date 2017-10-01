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
  private feed: FirebaseListObservable<QuoteFile[]>;
  private focusThumb: string;

  constructor(private quoteFile: QuoteService) {  }

  ngOnInit() {
    this.feed = this.quoteFile.getQuotes();
  }

  ngOnChanges() {  }

  toggleFocus(event, key) {
    if (this.focusThumb != key) {
      this.focusThumb = key;
    } else if (key == undefined || key == null || key == '') {
      this.focusThumb = ''
    }
    console.log(this.focusThumb)
    console.log(key)
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.class;
    var value = idAttr.nodeValue;
    // console.log(target)
    // console.log(idAttr)
    // console.log(value)
  }

}
