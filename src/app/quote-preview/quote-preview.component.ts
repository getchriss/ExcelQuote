import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs';
import { QuoteService } from '../services/quote.service';
import { QuoteFile } from '../models/quote-file.model'

@Component({
  selector: 'app-quote-preview',
  templateUrl: './quote-preview.component.html',
  styleUrls: ['./quote-preview.component.css']
})

export class QuotePreviewComponent implements OnInit {
  private currentQuote: { [id: string]: any; } = [];
  private getQuote;
  public feed: FirebaseListObservable<QuoteFile[]>;
  private subscription: Subscription;
  private quote;
  private jobId;

  constructor(private af: AngularFireAuth, private route: ActivatedRoute, private router: Router, private quoteService: QuoteService) {
    this.jobId = this.route.snapshot.params.quote_num;
    this.getQuote = this.quoteService.getQuoteById(this.jobId)    
    
    this.getQuote.subscribe(snapshots => {
      this.currentQuote = [];
      snapshots.forEach(snapshot => {
        let tempVal = snapshot.val();
        let tempKey = snapshot.key;
        this.currentQuote[tempKey] = tempVal;
      });
    });
  }
  
  ngOnInit() {}

}
