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
  currentQuote: { [id: string]: any; } = [];
  currentQuoteObj;
  getQuote;
  feed: FirebaseListObservable<QuoteFile[]>;
  subscription: Subscription;
  user: Observable<firebase.User>;
  getUserData: any;
  userData: any = {};
  userId: string;
  quote;
  jobId;
  compTitle;
  text: string;
  quotes;
  quoteNumbers: any = [];
  foo: any;

  constructor(private af: AngularFireAuth, private route: ActivatedRoute, private router: Router, private quoteService: QuoteService, private authService: AuthService) {
    this.jobId = this.route.snapshot.params.quote_num;
    this.getQuote = this.quoteService.getQuoteById(this.jobId)
    this.compTitle = this.jobId + ' PREVIEW';

    this.getQuote.subscribe(snapshots => {
      this.currentQuote = [];
      this.currentQuoteObj = {};
      snapshots.forEach(snapshot => {
        let tempVal = snapshot.val();
        let tempKey = snapshot.key;
        this.currentQuote[tempKey] = tempVal;
        this.currentQuoteObj[tempKey] = tempVal;
      });
    });

    this.foo = this.quoteService.getQuoteNumbers();

    this.foo.subscribe(snapshots => {
      this.quotes = snapshots.slice();
      // console.log(this.quotes[1].key)
      for (let i = 0; i < this.quotes.length; i++) {
        let tempKey = this.quotes[i].key;
        this.quoteNumbers.push(tempKey);
        // console.log(this.quoteNumbers)
      };
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

  copyToClipboard(elementId) {
    // Create an auxiliary hidden input
    const aux = <HTMLInputElement>document.createElement("input");
    const elm: any = <HTMLElement>document.getElementById(elementId)
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
    let temp = this.quoteService.updateStage(this.jobId, 'pending');
  }
  
  moveToCompleted() {
    let temp = this.quoteService.updateStage(this.jobId, 'completed');
  }
  
  moveToRequested() {
    let temp = this.quoteService.updateStage(this.jobId, 'requested');
  }
  
  repeatOrder(event) {
    // Add confirmation service here
    let quoteNum = this.createQuoteNumber(this.quoteNumbers);
    let copyQuote = this.currentQuoteObj;
    copyQuote.stage = 'requested';
    copyQuote.date = 'Direct reprint';
    this.quoteService.submitQuote(copyQuote, quoteNum);
    console.log("Order repeated!")
    this.router.navigate(['/overview'])
  }

  editOrder(event) {
    this.router.navigate(['/edit-form/'+this.jobId])
    // console.log("Editing order!")
  }

  createQuoteNumber(array) {
    let lastNumberPos = array.length - 1;
    let tempNumber = Number(array[lastNumberPos]) + 1;
    let newNumber = this.pad(tempNumber, 6);
    return newNumber;
  }

  pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length - size);
  }

}
