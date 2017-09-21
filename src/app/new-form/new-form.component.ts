import { Component, OnInit, OnChanges, HostBinding, Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { slideIn } from '../_animations/index';W
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import Dropbox = require('dropbox');

import { AuthService } from '../services/auth.service';
import { QuoteService } from '../services/quote.service';

import { QuoteFile } from '../models/quote-file.model'

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css']
})
export class NewFormComponent implements OnInit, OnChanges {
  clipboard: any;

  client: string;
  email: string;
  address: string;
  phone: string;
  date: any;
  userFile: any;
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
  color: string;
  embel: string;
  appliedBy: string;
  adhesive: string;
  overPrint: string;
  core: number;
  windStyle: string;
  proofType: string;
  addInfo: string;  

  $stocks: any;
  $finishes: any;
  $adhesives: any;
  $embelishments: any;

  quote = {
    client: this.client,
    email: this.email,
    address: this.address,
    phone: this.phone,
    date: this.date,
    userFile: this.userFile,
    noKinds: this.noKinds,
    qKinds: this.qKinds,
    cost: this.cost,
    width: this.width,
    height: this.height,
    labelsPer: this.labelsPer,
    gap: this.gap,
    knife: this.knife,
    charge: this.charge,
    stock: this.stock,
    color: this.color,
    embel: this.embel,
    appliedBy: this.appliedBy,
    adhesive: this.adhesive,
    overPrint: this.overPrint,
    core: this.core,
    windStyle: this.windStyle,
    proofType: this.proofType,
    addInfo: this.addInfo
  };

  constructor(private form: QuoteService) { }

  ngOnInit() {
    this.$stocks = this.form.getStocks();
    this.$finishes = this.form.getFinishes();
    this.$adhesives = this.form.getAdhesive();
    this.$embelishments = this.form.getEmbelishment();
    this.date = new Date();
  }

  ngOnChanges() {
  }

  submitQuote() {
    this.uploadFile();
    this.form.sendQuote(this.quote)
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.submitQuote();
    }
  }

  fileEvent(event) {
    let file = event.target.files[0];
    this.userFile = file;
  }

  uploadFile() {
    var ACCESS_TOKEN = 'bdhRYZ0OjnkAAAAAAABYM8rgdQwtJC3K9uaA371lK6UDmhpKGmKI8M2Qfhztg6h5';
    var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
    dbx.filesUpload({path: '/' + this.userFile.name, contents: this.userFile})
      .then(function(response) {
        var results = document.getElementById('results');
        results.appendChild(document.createTextNode('File uploaded!'));
        console.log(response);
      })
      .catch(function(error) {
        console.error(error);
      });
    return false;
  }

}
