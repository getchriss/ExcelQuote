import { Component, OnInit, HostBinding, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs/Subscription';
// import { ROUTER_ANIMATION } from '../_animations/router_animation.animation'

// import { slideIn } from '../_animations/index';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
  encapsulation: ViewEncapsulation.Emulated
  // animations: [ROUTER_ANIMATION]
})

export class DashComponent implements OnInit {
  // @HostBinding('@routerTransition') routerTransition;

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

  logout() {
    this.authService.logout();
  }

  newForm() {
    this.router.navigate(['quote-form']);
  }
}
