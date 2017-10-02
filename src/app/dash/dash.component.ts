import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs/Subscription';

import { slideIn } from '../_animations/index';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']//,
  // animations: [slideIn()]
})

export class DashComponent implements OnInit {
  // @HostBinding('@routerTransition') routerTransition;

  user: Observable<firebase.User>;
  userEmail: string;
  userId: string;
  getUserData: any;
  userData: any = {};
  tiles: any[];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        this.userId = user.uid;
        // console.log(this.userId)

        this.getUserData = this.authService.getUserData(this.userId)
        this.getUserData.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.userData[snapshot.key] = snapshot.val();
          });
        });
      }
    });
    this.tiles = [
      {text: 'One', cols: 4, rows: 1, color: 'lightblue'},
      {text: 'Two', cols: 4, rows: 1, color: 'lightgreen'},
      {text: 'Three', cols: 4, rows: 1, color: 'lightpink'},
      {text: 'Four', cols: 4, rows: 1, color: '#DDBDF1'},
      {text: 'Five', cols: 4, rows: 1, color: '#DDBDF1'},
      {text: 'Six', cols: 4, rows: 1, color: '#DDBDF1'},
    ];

    // this.getUserData = this.authService.getUserData(this.userId)
    // console.log(this.userId)
    
  }

  logout() {
    this.authService.logout();
  }

  newForm() {
    this.router.navigate(['quote-form']);
  }
}
