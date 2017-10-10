import { Component, OnInit, OnChanges, HostBinding, Injectable, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { slideIn } from '../_animations/index';W

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdSnackBar, MdDialog, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import Dropbox = require('dropbox');

import { AuthService } from '../services/auth.service';
import { QuoteService } from '../services/quote.service';
import { QuoteFile } from '../models/quote-file.model';

import { RequestOptions, RequestMethod, RequestOptionsArgs, Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ConfirmComponent } from '../confirm/confirm.component';



const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PHONE_REGEX = /^(\((03|04|06|07|09)\)\d{7})|(\((021|022|025|027|028|029)\)\d{6,8})|((0508|0800|0900)\d{5,8})$/;
// const ZIP_REGEX =   /^([0-9]){4}?$/;

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})


export class NewFormComponent implements OnInit, OnChanges {
  clipboard: any;
  files: FileList;
  dialogRef: MdDialogRef<ConfirmComponent>;
  foo: FirebaseListObservable<QuoteFile[]>;
  quoteToEdit;
  quotes: { [id: string]: any; } = [];
  quoteNumbers: any = [];

  client = '';
  email = '';
  address = '';
  phone = '';
  date: any;
  userFileName: any;
  noKinds: number;
  qKinds: number;
  cost = '';
  width: number;
  height: number;
  labelsPer: number;
  gap = 4;
  knife = '';
  charge = '';
  stock = '';
  colour = '';
  embel = '';
  finishes = '';
  orient = '';
  appliedBy = '';
  adhesive = '';
  overPrint = '';
  core: number;
  windStyle: string;
  suppliedIn = '';
  proofType = '';
  addInfo = '';

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
    fileName: this.userFileName,
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
    colour: this.colour,
    embel: this.embel,
    finishes: this.finishes,
    orient: this.orient,
    appliedBy: this.appliedBy,
    adhesive: this.adhesive,
    overPrint: this.overPrint,
    core: this.core,
    windStyle: this.windStyle,
    suppliedIn: this.suppliedIn,
    proofType: this.proofType,
    addInfo: this.addInfo
  };
  compTitle;
  jobId;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);

  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(PHONE_REGEX)]);

  globalFormControl = new FormControl('', [
    Validators.required]);


  @ViewChild('datePicker') input;

  constructor(private form: QuoteService, private snackBar: MdSnackBar, private router: Router,
    private route: ActivatedRoute, public dialog: MdDialog, private http: Http) {
    this.compTitle = 'NEW REQUEST';

    this.foo = this.form.getQuoteNumbers();

    this.foo.subscribe(snapshots => {
      this.quotes = snapshots.slice();
      // console.log(this.quotes[1].key)
      for (let i = 0; i < this.quotes.length; i++) {
        const tempKey = this.quotes[i].key;
        this.quoteNumbers.push(tempKey);
        // console.log(this.quoteNumbers)
      }
    });

    if (this.route.snapshot.params.quote_num !== undefined) {

      this.jobId = this.route.snapshot.params.quote_num;
      this.compTitle = 'EDITING ' + this.jobId;

      this.quoteToEdit = this.form.getQuoteById(this.jobId);

      this.quoteToEdit.subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          // let temp = snapshot
          // console.log(snapshot.key)
          this.quote[snapshot.key] = snapshot.val();
          // console.log(this.userData)
        });
      });

      console.log(this.quoteToEdit);
      console.log('Editing previous quote: ' + this.jobId);

    } else {
      console.log('Brand new quote request');
    }
  }

  ngOnInit() {
    this.$stocks = this.form.getStocks();
    this.$finishes = this.form.getFinishes();
    this.$adhesives = this.form.getAdhesive();
    this.$embelishments = this.form.getEmbelishment();
    this.date = new Date();
  }

  ngOnChanges() { }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.submitQuote();
    }
  }

  // submitQuote() {
  //   const quoteNum = this.createQuoteNumber(this.quoteNumbers);
  //   this.quote.date = this.input.nativeElement.value;
  //   if (this.form.validateQuote(this.quote)) {
  //     this.dialogRef = this.dialog.open(ConfirmComponent, {
  //       disableClose: false
  //     });
  //     this.dialogRef.componentInstance.confirmMessage = 'Please <b>confirm</b> submission';
  //     this.dialogRef.afterClosed().subscribe(result => {
  //       if (result) {
  //         this.form.submitQuote(this.quote, quoteNum);
  //         console.log('Submitted');
  //         this.router.navigate(['/dash']);
  //       }
  //       this.dialogRef = null;
  //     });
  //   } else {
  //     console.log('There was an error with the validation. Check all required fields have been completed...');
  //     this.snackBar.open(`Please check all required fields have been completed.`, '', { duration: 2000 });
  //   }
  // }

  submitQuote() {
    const quoteNum = this.createQuoteNumber(this.quoteNumbers);
    this.quote.date = this.input.nativeElement.value;
    // if (this.form.validateQuote(this.quote)) {
    this.dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = 'Please <b>confirm</b> submission';
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.form.submitQuote(this.quote, quoteNum);
        this.sendEmail();
        // console.log('Submitted');
        this.router.navigate(['/dash']);
      }
      this.dialogRef = null;
    });
    // } else {
    // console.log('There was an error with the validation. Check all required fields have been completed...');
    // this.snackBar.open(`Please check all required fields have been completed.`, '', { duration: 2000 });
    // }
  }

  fileEvent(event) {
    const file = event.target.files[0];
    this.$userFile = file;
    this.quote.fileName = event.target.files[0].name;
  }

  uploadFile() {
    const ACCESS_TOKEN = 'bdhRYZ0OjnkAAAAAAABYM8rgdQwtJC3K9uaA371lK6UDmhpKGmKI8M2Qfhztg6h5';
    const dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
    dbx.filesUpload({ path: '/' + this.$userFile.name, contents: this.$userFile })
      .then(function (response) {
        const results = document.getElementById('results');
        results.appendChild(document.createTextNode('File uploaded!'));
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
    return false;
  }

  createQuoteNumber(array) {
    const lastNumberPos = array.length - 1;
    const tempNumber = Number(array[lastNumberPos]) + 1;
    const newNumber = this.pad(tempNumber, 6);
    return newNumber;
  }

  pad(num, size) {
    const s = '000000000' + num;
    return s.substr(s.length - size);
  }

  onChange(files: FileList) {
    this.files = files;
  }


  sendEmail() {
    const url = `https://us-central1-excel-quote-manager.cloudfunctions.net/httpEmail`;
    const params: URLSearchParams = new URLSearchParams();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    params.set('to', 'joshp@exceldp.co.nz');
    params.set('from', 'quote_manager@noreply.com');
    params.set('subject', 'test-email');
    params.set('content', 'Hello World');
    return this.http.post(url, params, { headers: headers })
      .toPromise()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

// var input = document.getElementById("userFile");

// input.onclick = function () {
//   this.value = null;
// };

// input.onchange = function () {
//   var path = input.value;
//   var filename = "";
//   if (path.lastIndexOf("\\") != -1)
//     filename = path.substring(path.lastIndexOf("\\") + 1, path.length);
//   else
//     filename = path.substring(path.lastIndexOf("/") + 1, path.length);
//   document.getElementById("log").innerHTML = filename;
// };
