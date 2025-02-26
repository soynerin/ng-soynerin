import { Component, OnInit } from '@angular/core';
declare function typedJS(): any;

@Component({
    selector: 'app-hero',
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.css'],
    standalone: false
})
export class HeroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
      typedJS();
  }

}
