import { Component, OnInit, OnChanges, HostBinding, Injectable, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
// import { slideIn } from '../_animations/index';W
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import Dropbox = require('dropbox');

import { AuthService } from '../services/auth.service';
import { QuoteService } from '../services/quote.service';

import { QuoteFile } from '../models/quote-file.model'

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PHONE_REGEX = /^(\((03|04|06|07|09)\)\d{7})|(\((021|022|025|027|028|029)\)\d{6,8})|((0508|0800|0900)\d{5,8})$/;
// const ZIP_REGEX =   /^([0-9]){4}?$/;

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css']
})


export class NewFormComponent implements OnInit, OnChanges {
  clipboard: any;
  
  private foo: FirebaseListObservable<QuoteFile[]>;
  private quotes: { [id: string]: any; } = [];
  private quoteNumbers: any = [];

  client: string = '';
  email: string = '';
  address: string = '';
  phone: string = '';
  date: any;
  userFileName: any;
  noKinds: number;
  qKinds: number;
  cost: string = '';
  width: number;
  height: number;
  labelsPer: number;
  gap: number = 4;
  knife: string = '';
  charge: string = '';
  stock: string = '';
  color: string = '';
  embel: string = '';
  orient: string = '';
  appliedBy: string = '';
  adhesive: string = '';
  overPrint: string = '';
  core: number;
  windStyle: string;
  supplied: string = '';
  proofType: string = '';
  addInfo: string = '';

  $stocks: any;
  $finishes: any;
  $adhesives: any;
  $embelishments: any;
  $userFile: any;

  quote: any = {
    client: this.client,
    email: this.email,
    address: this.address,
    phone: this.phone,
    date: this.date,
    userFileName: this.userFileName,
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
    orient: this.orient,
    appliedBy: this.appliedBy,
    adhesive: this.adhesive,
    overPrint: this.overPrint,
    core: this.core,
    windStyle: this.windStyle,
    supplied: this.supplied,
    proofType: this.proofType,
    addInfo: this.addInfo
  };

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);

  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(PHONE_REGEX)]);

  globalFormControl = new FormControl('', [
    Validators.required]);


  @ViewChild('datePicker') input;

  constructor(private form: QuoteService, private snackBar: MdSnackBar) {

    this.foo = this.form.getQuoteNumbers();

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
    this.$stocks = this.form.getStocks();
    this.$finishes = this.form.getFinishes();
    this.$adhesives = this.form.getAdhesive();
    this.$embelishments = this.form.getEmbelishment();
    this.date = new Date();
  }

  submitQuote() {
    let quoteNum = this.createQuoteNumber(this.quoteNumbers);
    // console.log(quoteNum)
    this.quote.date = this.input.nativeElement.value;
    if (this.form.validateQuote(this.quote)) {
      this.form.submitQuote(this.quote, quoteNum);
      // this.uploadFile();
    } else {
      // this.quote.date = this.input.nativeElement.value;
      // this.d = this.formatDate(this.date)
      // console.log(this.input.nativeElement.value);
      // console.log(this.quote.date);
      console.log('There was an error with the validation. Check all required fields have been completed...')
      this.snackBar.open(`Please check all required fields have been completed.`, '', { duration: 2000 })
      // console.log(this.date)
    }
  }

  ngOnChanges() { }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.submitQuote();
    }
  }

  fileEvent(event) {
    let file = event.target.files[0];
    this.$userFile = file;
    this.quote.userFileName = event.target.files[0].name;
  }

  uploadFile() {
    var ACCESS_TOKEN = 'bdhRYZ0OjnkAAAAAAABYM8rgdQwtJC3K9uaA371lK6UDmhpKGmKI8M2Qfhztg6h5';
    var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
    dbx.filesUpload({ path: '/' + this.$userFile.name, contents: this.$userFile })
      .then(function (response) {
        var results = document.getElementById('results');
        results.appendChild(document.createTextNode('File uploaded!'));
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
    return false;
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

