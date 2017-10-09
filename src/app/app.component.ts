import { Component } from '@angular/core';
// import { ROUTER_ANIMATION } from './_animations/router_animation.animation'
import { animate, state, style, transition, trigger, query, stagger, animateChild, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routerAnimations', [

      transition('dash => quote-management', [
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
        query(':leave', style({ zIndex: 100 })),
        query(':enter', style({ transform: 'translateX(100%)', zIndex: 110 })),
        group([
          query(':leave', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
            animateChild()
          ]),
          query(':enter', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
            animateChild()
          ])
        ])
      ]),

      transition('quote-management => dash', [
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
        query(':leave', style({ zIndex: 100 })),
        query(':enter', style({ transform: 'translateX(0%)' })),
        group([
          query(':leave', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
            animateChild()
          ]),
          query(':enter', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
            animateChild()
          ])
        ])
      ]),

      transition('quote-management => quote-preview', [
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
        query(':leave', style({ zIndex: 100 })),
        query(':enter', style({ transform: 'translateX(100%)', zIndex: 110 })),
        group([
          query(':leave', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })),
            animateChild()
          ]),
          query(':enter', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
            animateChild()
          ])
        ])
      ]),

      transition('quote-preview => quote-management', [
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
        query(':leave', style({ zIndex: 100 })),
        query(':enter', style({ transform: 'translateX(-100%)' })),
        group([
          query(':leave', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
            animateChild()
          ]),
          query(':enter', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
            animateChild()
          ])
        ])
      ]),

      transition('dash => new-form', [
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
        query(':leave', style({ zIndex: 100 })),
        query(':enter', style({ transform: 'translateX(100%)', zIndex: 110 })),
        group([
          query(':leave', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
            animateChild()
          ], { optional: true } ),
          query(':enter', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
            animateChild()
          ], { optional: true })
        ])
      ]),

      transition('new-form => dash', [
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
        query(':leave', style({ zIndex: 100 })),
        query(':enter', style({ transform: 'translateX(0%)' })),
        group([
          query(':leave', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
            animateChild()
          ], { optional: true }),
          query(':enter', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
            animateChild()
          ], { optional: true })
        ])
      ]),

      transition('dash => overview', [
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
        query(':leave', style({ zIndex: 100 })),
        query(':enter', style({ transform: 'translateX(100%)' })),
        group([
          query(':leave', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })),
            animateChild()
          ]),
          query(':enter', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
            animateChild()
          ])
        ])
      ]),

      transition('overview => dash', [
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
        query(':leave', style({ zIndex: 100 })),
        query(':enter', style({ transform: 'translateX(-100%)' })),
        group([
          query(':leave', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
            animateChild()
          ]),
          query(':enter', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
            animateChild()
          ])
        ])
      ]),

      transition('overview => quote-preview', [
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
        query(':leave', style({ zIndex: 100 })),
        query(':enter', style({ transform: 'translateX(100%)' })),
        group([
          query(':leave', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })),
            animateChild()
          ]),
          query(':enter', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
            animateChild()
          ])
        ])
      ]),

      transition('quote-preview => overview', [
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
        query(':leave', style({ zIndex: 100 })),
        query(':enter', style({ transform: 'translateX(-100%)' })),
        group([
          query(':leave', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
            animateChild()
          ]),
          query(':enter', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
            animateChild()
          ])
        ])
      ]),

      transition('login => signup', [
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
        query(':leave', style({ zIndex: 100 })),
        query(':enter', style({ transform: 'translateY(100%)' })),
        group([
          query(':leave', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(-100%)' })),
            animateChild()
          ]),
          query(':enter', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(0%)' })),
            animateChild()
          ])
        ])
      ]),

      transition('signup => login', [
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
        query(':leave', style({ zIndex: 100 })),
        query(':enter', style({ transform: 'translateY(-100%)' })),
        group([
          query(':leave', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(100%)' })),
            animateChild()
          ]),
          query(':enter', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(0%)' })),
            animateChild()
          ])
        ])
      ]),

      transition('login => dash', [
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
        query(':leave', style({ zIndex: 100 })),
        query(':enter', style({ transform: 'translateX(100%)' })),
        group([
          query(':leave', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })),
            animateChild()
          ]),
          query(':enter', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
            animateChild()
          ])
        ])
      ]),

      transition('dash => login', [
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
        query(':leave', style({ zIndex: 100 })),
        query(':enter', style({ transform: 'translateX(-100%)' })),
        group([
          query(':leave', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
            animateChild()
          ]),
          query(':enter', [
            animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
            animateChild()
          ])
        ])
      ])
    ])
  ]

})
export class AppComponent {
  title = 'ExcelQuote';

  prepRouteState(outlet: any) {
    const animation = outlet.activatedRouteData['animation'] || {};
    return animation['value'] || null;
  }
}
