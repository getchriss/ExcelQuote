import { Component, OnInit, HostBinding, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
<<<<<<< HEAD
  encapsulation: ViewEncapsulation.Emulated
  // animations: [ROUTER_ANIMATION]
=======
  encapsulation: ViewEncapsulation.Emulated,
>>>>>>> 10/10/17---Josh
})

export class DashComponent implements OnInit {

  user: Observable<firebase.User>;
  userEmail: string;
  userId: string;
  getUserData: any;
  userData: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        this.userId = user.uid;
        this.getUserData = this.authService.getUserData(this.userId);
        this.getUserData.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.userData[snapshot.key] = snapshot.val();
          });
        });
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  newForm() {
    this.router.navigate(['quote-form']);
  }
}
