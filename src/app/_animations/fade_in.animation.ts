import { animate, state, style, transition, trigger, query, stagger, animateChild } from '@angular/animations';

export const FADE_IN_ANIMATION = [
    trigger('FadeIn', [
        transition('* => *', [
            query(':self', [
                style({ opacity: 0 }),
                animate(500, style({ opacity: 1 })),
            ], { optional: true })
        ])
    ])
];
