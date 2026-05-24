import { Component, OnInit } from '@angular/core'
declare const Typed: any

@Component({
    selector: 'app-hero',
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.css'],
    standalone: false,
})
export class HeroComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        new Typed('.element', {
            strings: [
                'DESARROLLADOR WEB',
                'DISEÑADOR INDUSTRIAL',
                'TÉCNICO EN REPARACIÓN',
            ],
            typeSpeed: 60,
            backSpeed: 30,
            loop: true,
        })
    }
}
