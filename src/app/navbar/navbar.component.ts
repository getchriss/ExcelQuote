import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  user: Observable<firebase.User>;
  userEmail: string;

  @Input() compTitle: string;

  constructor(private authService: AuthService, public _location: Location) { }

  ngOnInit() {
    this.user = this.authService.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
  public goback() {
    this._location.back();
  }
}

