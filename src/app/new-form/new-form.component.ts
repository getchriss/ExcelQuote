import { Component, OnInit, OnChanges, HostBinding, Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { slideIn } from '../_animations/index';W
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AuthService } from '../services/auth.service';
import { QuoteService } from '../services/quote.service';

import { QuoteFile } from '../models/quote-file.model'

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css']
})
export class NewFormComponent implements OnInit {
  clipboard: any;

  client: string;
  email: string;
  address: string;
  phone: string;
  noKinds: number;
  qKinds: number;
  cost: string;
  width: string;
  height: string;
  labelsPer: number;
  gap: number;
  knife: string;
  charge: string;
  stock: string;

  $stocks: any;
  $finishes: any;
  $adhesives: any;
  $embelishments: any;

  quote = {
    client: this.client,
    email: this.email,
    address: this.address,
    phone: this.phone,
    noKinds: this.noKinds,
    qKinds: this.qKinds,
    cost: this.cost,
    width: this.width,
    height: this.height,
    labelsPer: this.labelsPer,
    gap: this.gap,
    knife: this.knife,
    charge: this.charge,
    stock: this.stock
  };
  
  constructor(private form: QuoteService) {  }
  
  ngOnInit() {
    // this.clipboard = this.form.getQuotes();
    this.$stocks = this.form.getStocks();
    this.$finishes = this.form.getFinishes();
    this.$adhesives = this.form.getAdhesive();
    this.$embelishments = this.form.getEmbelishment();
    // console.log(this.stocks)
  }
  
  submitQuote() {
    this.form.sendQuote(this.quote)
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.submitQuote();
    }
  }

}
