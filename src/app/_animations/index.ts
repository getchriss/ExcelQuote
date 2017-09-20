// import the required animation functions from the angular animations module
import { Component } from '@angular/core';
import { trigger, state, animate, style, transition } from '@angular/animations';

export function slideIn() { 
    return trigger('routerTransition', [
        state('void', style({
            opacity: 0
        })),
        state('*', style({
            opacity: 1
        })),
        transition(':enter', [style({ opacity: 0 }), animate('600ms ease-in', style({ opacity: 1 }))]),
        transition(':leave', [style({ opacity: 1 }), animate('600ms ease-out', style({ opacity: 0 }))])
    ]);
}

export class RouterAnimations {
    static animate() {
        return trigger('routerTransition', [
            state('void', style({ opacity: 0 })),
            state('*', style({ opacity: 1 })),
            transition(':enter', [
                style({ opacity: 0 }),
                animate('0.4s ease')
            ]),
            transition(':leave', [
                style({ opacity: 1 }),
                animate('0.4s ease')
            ])
        ]);
    };
};

export function fade() {
    return trigger('routerTransition', [
        state('void', style({
            position: 'fixed', opacity: 1
        })),
        state('*', style({
            position: 'relative', opacity: 0
        })),
        transition(':enter', [style({ opacity: 0 }), animate('0.4s ease', style({ opacity: 1 }))]),
        transition(':leave', [style({ opacity: 1 }), animate('0.4s ease', style({ opacity: 0 }))])
    ]);
}