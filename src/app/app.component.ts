import { Component } from '@angular/core';
import { RouterAnimation } from './_animations/router_animation.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ RouterAnimation ]
})
export class AppComponent {
  title = 'ExcelQuote';

  prepRouteState(outlet: any) {
    const animation = outlet.activatedRouteData['animation'] || {};
    return animation['value'] || null;
  }
}
