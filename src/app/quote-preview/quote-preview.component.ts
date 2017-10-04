import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
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
  user: Observable<firebase.User>;
  getUserData: any;
  userData: any = {};
  userId: string;
  private quote;
  private jobId;
  public compTitle;
  text: string;

  constructor(private af: AngularFireAuth, private route: ActivatedRoute, private router: Router, private quoteService: QuoteService, private authService: AuthService) {
    this.jobId = this.route.snapshot.params.quote_num;
    this.getQuote = this.quoteService.getQuoteById(this.jobId)
    this.compTitle = this.jobId + ' PREVIEW';

    this.getQuote.subscribe(snapshots => {
      this.currentQuote = [];
      snapshots.forEach(snapshot => {
        let tempVal = snapshot.val();
        let tempKey = snapshot.key;
        this.currentQuote[tempKey] = tempVal;
      });
    });
  }

  ngOnInit() {
    this.user = this.authService.authUser();
    this.user.subscribe(user => {
      if (user) {
        // this.userEmail = user.email;
        this.userId = user.uid;
        // console.log(this.userId)

        this.getUserData = this.authService.getUserData(this.userId)
        this.getUserData.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.userData[snapshot.key] = snapshot.val();
            // console.log(this.userData)
          });
        });
      }
    });
  }

  console(id) {
    console.log(document.getElementById(id))
  }

  copyToClipboard(elementId) {
    // Create an auxiliary hidden input
    const aux = <HTMLInputElement> document.createElement("input");
    const elm: any = <HTMLElement> document.getElementById(elementId)
    const text = elm.innerHTML;
    // Get the text from the element passed into the input
    aux.setAttribute("value", text);
    // Append the aux input to the body
    document.body.appendChild(aux);
    // Highlight the content
    aux.select();
    // Execute the copy command
    document.execCommand("copy");
    // Remove the input from the body
    document.body.removeChild(aux);
  }

  moveToPending() {
    const temp = this.quoteService.updateStage(this.jobId, 'pending');
  }

  moveToCompleted(jobId) {
    const temp = this.quoteService.updateStage(this.jobId, 'completed');
  }

  moveToRequested(jobId) {
    const temp = this.quoteService.updateStage(this.jobId, 'requested');
  }

}
