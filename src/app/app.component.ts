import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from './route-animation';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [slideInAnimation],
    standalone: false
})
export class AppComponent {
}
