import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs';
import { QuoteService } from '../services/quote.service';

@Component({
  selector: 'app-quote-preview',
  templateUrl: './quote-preview.component.html',
  styleUrls: ['./quote-preview.component.css']
})
export class QuotePreviewComponent implements OnInit {

  private subscription: Subscription;
  private quotes;

  constructor(private af: AngularFireAuth,
              private route: ActivatedRoute,
              private router: Router,
              private quoteService: QuoteService) { }

  ngOnInit() {
    this.quotes = this.quoteService.getQuotes()
  }

}
