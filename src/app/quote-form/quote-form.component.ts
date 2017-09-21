import { Component, OnInit, OnChanges, HostBinding, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { slideIn } from '../_animations/index';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AuthService } from '../services/auth.service';
import { QuoteService } from '../services/quote.service';

import { QuoteFile } from '../models/quote-file.model'

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css'],
  animations: [slideIn()]
})

export class QuoteFormComponent implements OnInit, OnChanges {
  @HostBinding('@routerTransition') routerTransition;
  feed: any;
  client: string;
  email: string;
  address: string;
  addressCont: string;
  phone: string;
  quote = {
    client: this.client,
    email: this.email,
    address: this.address,
    addressCont: this.addressCont,
    phone: this.phone
  };
  
  constructor(private form: QuoteService) {  }
  
  ngOnInit() {
    this.feed = this.form.getQuotes();
  }
  
  // submitQuote() {
  //   this.form.sendQuote(this.quote)
  // }

  // handleSubmit(event) {
  //   if (event.keyCode === 13) {
  //     this.submitQuote();
  //   }
  // }

  ngOnChanges() {
  }

}