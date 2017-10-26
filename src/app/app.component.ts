import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterAnimation } from './_animations/router_animation.animation';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ RouterAnimation ]
})
export class AppComponent {
  title = 'ExcelQuote';
  user: Observable<firebase.User>;

  prepRouteState(outlet: any) {
    const animation = outlet.activatedRouteData['animation'] || {};
    return animation['value'] || null;
  }

  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.authUser();
    this.user.subscribe(user => {
      if (user == null) {
        this.router.navigate(['login']);
        console.log(user);
      } else if (user) {
        this.router.navigate(['dash']);
      }
    });
  }
}
