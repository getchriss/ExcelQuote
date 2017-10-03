import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { QuoteService } from '../services/quote.service'
import { AuthService } from '../services/auth.service'

import { QuoteFile } from '../models/quote-file.model'


@Component({
  selector: 'app-quote-thumbnail',
  templateUrl: './quote-thumbnail.component.html',
  styleUrls: ['./quote-thumbnail.component.css']
})

export class QuoteThumbnailComponent implements OnInit {
  client: FirebaseListObservable<QuoteFile[]>;

  constructor(private quoteFile: QuoteService) {}
  
  ngOnInit() {
    this.client = this.quoteFile.getClient();
  }

  ngOnChanges() {
    this.client = this.quoteFile.getClient();
  } 
}

