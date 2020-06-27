import {
   transition,
   trigger,
   query,
   style,
   animate,
   group,
   animateChild
} from '@angular/animations';
export const slideInAnimation =
   trigger('routeAnimations', [
        transition('Contact => *', [
                query(':enter, :leave', 
                    style({ position: 'fixed', width: '100%' }), 
                    { optional: true }),        
                group([
                    query(':enter',[
                        style({ transform: 'translateX(-100%)' }),
                        animate('0.5s ease-in-out', 
                        style({ transform: 'translateX(0%)' }))
                    ], { optional: true }),
                    query(':leave', [
                        style({ transform:   'translateX(0%)'}),
                        animate('0.5s ease-in-out', 
                        style({ transform: 'translateX(100%)' }))
                    ], { optional: true }),
                ])
        ]),
        transition('Hero => *', [
                query(':enter, :leave', 
                    style({ position: 'fixed',  width: '100%' }), 
                    { optional: true }),
                group([
                    query(':enter', [
                        style({ transform: 'translateX(100%)' }), 
                        animate('0.5s ease-in-out', 
                        style({ transform: 'translateX(0%)' }))
                    ], { optional: true }),
                    query(':leave', [
                        style({ transform: 'translateX(0%)' }),
                        animate('0.5s ease-in-out', 
                        style({ transform: 'translateX(-100%)' }))
                        ], { optional: true }),
                ])
        ]),
        transition('About => Resume', [
                query(':enter, :leave', 
                    style({ position: 'fixed', width: '100%' }), 
                    { optional: true }),
                group([
                    query(':enter', [
                        style({ transform: 'translateX(100%)' }),
                        animate('0.5s ease-in-out', 
                        style({ transform: 'translateX(0%)' }))
                    ], { optional: true }),
                    query(':leave', [
                        style({ transform: 'translateX(0%)' }),
                        animate('0.5s ease-in-out', 
                        style({ transform: 'translateX(-100%)' }))
                    ], { optional: true }),
                ])
        ]),
        transition('About => Portfolio', [
                query(':enter, :leave', 
                    style({ position: 'fixed', width: '100%' }), 
                    { optional: true }),
                group([
                    query(':enter', [
                        style({ transform: 'translateX(100%)' }),
                        animate('0.5s ease-in-out', 
                        style({ transform: 'translateX(0%)' }))
                    ], { optional: true }),
                    query(':leave', [
                        style({ transform: 'translateX(0%)' }),
                        animate('0.5s ease-in-out', 
                        style({ transform: 'translateX(-100%)' }))
                    ], { optional: true }),
                ])
        ]),
        transition('About => Contact', [
            query(':enter, :leave', 
                style({ position: 'fixed', width: '100%' }), 
                { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateX(100%)' }),
                    animate('0.5s ease-in-out', 
                    style({ transform: 'translateX(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('0.5s ease-in-out', 
                    style({ transform: 'translateX(-100%)' }))
                ], { optional: true }),
            ])
        ]),        
        transition('About => Hero', [
                query(':enter, :leave', 
                    style({ position: 'fixed', width: '100%' }), 
                    { optional: true }),
                group([
                    query(':enter', [
                        style({ transform: 'translateX(-100%)' }),
                        animate('0.5s ease-in-out', 
                        style({ transform: 'translateX(0%)' }))
                    ], { optional: true }),
                    query(':leave', [
                        style({ transform: 'translateX(0%)' }),
                        animate('0.5s ease-in-out', 
                        style({ transform: 'translateX(100%)' }))
                    ], { optional: true }),
                ])
        ]),
        transition('Resume => Hero', [
                query(':enter, :leave', 
                    style({ position: 'fixed', width: '100%' }), 
                    { optional: true }),
                group([
                    query(':enter', [
                        style({ transform: 'translateX(-100%)' }),
                        animate('0.5s ease-in-out', 
                        style({ transform: 'translateX(0%)' }))
                    ], { optional: true }),
                    query(':leave', [
                        style({ transform: 'translateX(0%)' }),
                        animate('0.5s ease-in-out', 
                        style({ transform: 'translateX(100%)' }))
                    ], { optional: true }),
                ])
        ]),
        transition('Resume => About', [
                query(':enter, :leave', 
                    style({ position: 'fixed', width: '100%' }), 
                    { optional: true }),
                group([
                    query(':enter', [
                        style({ transform: 'translateX(-100%)' }),
                        animate('0.5s ease-in-out', 
                        style({ transform: 'translateX(0%)' }))
                    ], { optional: true }),
                    query(':leave', [
                        style({ transform: 'translateX(0%)' }),
                        animate('0.5s ease-in-out', 
                        style({ transform: 'translateX(100%)' }))
                    ], { optional: true }),
                ])
        ]),
        transition('Resume => Portfolio', [
            query(':enter, :leave', 
                style({ position: 'fixed', width: '100%' }), 
                { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateX(100%)' }),
                    animate('0.5s ease-in-out', 
                    style({ transform: 'translateX(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('0.5s ease-in-out', 
                    style({ transform: 'translateX(-100%)' }))
                ], { optional: true }),
            ])
        ]),         
        transition('Resume => Contact', [
            query(':enter, :leave', 
                style({ position: 'fixed', width: '100%' }), 
                { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateX(100%)' }),
                    animate('0.5s ease-in-out', 
                    style({ transform: 'translateX(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('0.5s ease-in-out', 
                    style({ transform: 'translateX(-100%)' }))
                ], { optional: true }),
            ])
        ]),     
        transition('Portfolio => Hero', [
            query(':enter, :leave', 
                style({ position: 'fixed', width: '100%' }), 
                { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateX(-100%)' }),
                    animate('0.5s ease-in-out', 
                    style({ transform: 'translateX(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('0.5s ease-in-out', 
                    style({ transform: 'translateX(100%)' }))
                ], { optional: true }),
            ])
        ]),            
        transition('Portfolio => About', [
            query(':enter, :leave', 
                style({ position: 'fixed', width: '100%' }), 
                { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateX(-100%)' }),
                    animate('0.5s ease-in-out', 
                    style({ transform: 'translateX(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('0.5s ease-in-out', 
                    style({ transform: 'translateX(100%)' }))
                ], { optional: true }),
            ])
        ]),            
        transition('Portfolio => Resume', [
            query(':enter, :leave', 
                style({ position: 'fixed', width: '100%' }), 
                { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateX(-100%)' }),
                    animate('0.5s ease-in-out', 
                    style({ transform: 'translateX(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('0.5s ease-in-out', 
                    style({ transform: 'translateX(100%)' }))
                ], { optional: true }),
            ])
        ]),    
        transition('Portfolio => Contact', [
            query(':enter, :leave', 
                style({ position: 'fixed', width: '100%' }), 
                { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateX(100%)' }),
                    animate('0.5s ease-in-out', 
                    style({ transform: 'translateX(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('0.5s ease-in-out', 
                    style({ transform: 'translateX(-100%)' }))
                ], { optional: true }),
            ])
        ]),                   
]);