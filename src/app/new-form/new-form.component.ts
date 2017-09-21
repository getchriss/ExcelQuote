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
import { DropboxService } from '../services/dropbox.service';

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

  date: any;
  userFile: any;

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

  constructor(private form: QuoteService, private file: DropboxService) { }

  ngOnInit() {
    // this.clipboard = this.form.getQuotes();
    this.$stocks = this.form.getStocks();
    this.$finishes = this.form.getFinishes();
    this.$adhesives = this.form.getAdhesive();
    this.$embelishments = this.form.getEmbelishment();
    this.date = new Date();
  }

  ngOnChanges() {
  }

  submitQuote() {
    // if ('files' in box) {
    // console.log(this.userFile)
    this.uploadFile();
    // }
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
    // let fileName = file.name;
    // console.log(fileName)
  }

  uploadFile() {
    // var Dropbox = require('dropbox');
    var ACCESS_TOKEN = 'bdhRYZ0OjnkAAAAAAABYM8rgdQwtJC3K9uaA371lK6UDmhpKGmKI8M2Qfhztg6h5';
    var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
    // var fileInput = (<HTMLInputElement> document.getElementById('file-upload'));
    // var file = fileInput.files[0];
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

  // handleUpload(event) {
  //   this.file.uploadToDbx();
  // }

}
