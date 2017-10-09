import { animate, state, style, transition, trigger, query, stagger, animateChild, group } from '@angular/animations';

export const ROUTER_ANIMATION = [
    trigger('routerAnimations', [

        // Moving from Dash => Quote-management
        transition('dash => quote-management', [
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
            query(':leave', style({ zIndex: 100 })),
            query(':enter', style({ transform: 'translateX(100%)' })),
            group([
                query(':leave', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })), // y: '-100%'
                    animateChild()
                ])),
                query(':enter', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
                    animateChild()
                ]))
            ])
        ]),

        // Moving from Quote-management => Dash
        transition('quote-management => dash', [
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
            query(':leave', style({ zIndex: 100 })),
            query(':enter', style({ transform: 'translateX(-100%)' })),
            group([
                query(':leave', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })), // y: '-100%'
                    animateChild()
                ])),
                query(':enter', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
                    animateChild()
                ]))
            ])
        ]),
        
        // Moving from Quote-management => Quote-preview
        transition('quote-management => quote-preview', [
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
            query(':leave', style({ zIndex: 100 })),
            query(':enter', style({ transform: 'translateX(100%)' })),
            group([
                query(':leave', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })), // y: '-100%'
                    animateChild()
                ])),
                query(':enter', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
                    animateChild()
                ]))
            ])
        ]),

        // Moving from Quote-preview => Quote-management
        transition('quote-preview => quote-management', [
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
            query(':leave', style({ zIndex: 100 })),
            query(':enter', style({ transform: 'translateX(-100%)' })),
            group([
                query(':leave', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })), // y: '-100%'
                    animateChild()
                ])),
                query(':enter', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
                    animateChild()
                ]))
            ])
        ]),

        // Moving from Dash => New-form
        transition('dash => new-form', [
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
            query(':leave', style({ zIndex: 100 })),
            query(':enter', style({ transform: 'translateX(100%)' })),
            group([
                query(':leave', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })), // y: '-100%'
                    animateChild()
                ])),
                query(':enter', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
                    animateChild()
                ]))
            ])
        ]),

        // Moving from New-form => Dash
        transition('new-form => dash', [
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
            query(':leave', style({ zIndex: 100 })),
            query(':enter', style({ transform: 'translateX(-100%)' })),
            group([
                query(':leave', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })), // y: '-100%'
                    animateChild()
                ])),
                query(':enter', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
                    animateChild()
                ]))
            ])
        ]),

        // Moving from Dash => Overview
        transition('dash => overview', [
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
            query(':leave', style({ zIndex: 100 })),
            query(':enter', style({ transform: 'translateX(100%)' })),
            group([
                query(':leave', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })), // y: '-100%'
                    animateChild()
                ])),
                query(':enter', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
                    animateChild()
                ]))
            ])
        ]),

        // Moving from Overview => Dash
        transition('overview => dash', [
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
            query(':leave', style({ zIndex: 100 })),
            query(':enter', style({ transform: 'translateX(-100%)' })),
            group([
                query(':leave', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })), // y: '-100%'
                    animateChild()
                ])),
                query(':enter', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
                    animateChild()
                ]))
            ])
        ]),

        // Moving from Overview => Preview
        transition('overview => quote-preview', [
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
            query(':leave', style({ zIndex: 100 })),
            query(':enter', style({ transform: 'translateX(100%)' })),
            group([
                query(':leave', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })), // y: '-100%'
                    animateChild()
                ])),
                query(':enter', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
                    animateChild()
                ]))
            ])
        ]),

        // Moving from Preview => Overview
        transition('quote-preview => overview', [
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
            query(':leave', style({ zIndex: 100 })),
            query(':enter', style({ transform: 'translateX(-100%)' })),
            group([
                query(':leave', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })), // y: '-100%'
                    animateChild()
                ])),
                query(':enter', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
                    animateChild()
                ]))
            ])
        ]),

        // Moving from Login => Signup
        transition('login => signup', [
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
            query(':leave', style({ zIndex: 100 })),
            query(':enter', style({ transform: 'translateY(100%)' })),
            group([
                query(':leave', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(-100%)' })), // y: '-100%'
                    animateChild()
                ])),
                query(':enter', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(0%)' })),
                    animateChild()
                ]))
            ])
        ]),

        // Moving from Signup => Login
        transition('signup => login', [
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
            query(':leave', style({ zIndex: 100 })),
            query(':enter', style({ transform: 'translateY(-100%)' })),
            group([
                query(':leave', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(100%)' })), // y: '-100%'
                    animateChild()
                ])),
                query(':enter', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(0%)' })),
                    animateChild()
                ]))
            ])
        ]),

        // Moving from Login => Dash
        transition('login => dash', [
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
            query(':leave', style({ zIndex: 100 })),
            query(':enter', style({ transform: 'translateX(100%)' })),
            group([
                query(':leave', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })), // y: '-100%'
                    animateChild()
                ])),
                query(':enter', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
                    animateChild()
                ]))
            ])
        ]),

        // Moving from Dash => Login
        transition('dash => login', [
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
            query(':leave', style({ zIndex: 100 })),
            query(':enter', style({ transform: 'translateX(-100%)' })),
            group([
                query(':leave', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })), // y: '-100%'
                    animateChild()
                ])),
                query(':enter', group([
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0%)' })),
                    animateChild()
                ]))
            ])
        ])
    ])
]