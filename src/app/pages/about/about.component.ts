import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  edad: number;

  constructor() { }

  ngOnInit(): void {
    this.edad = moment().diff('1989-05-09', 'years');
  }

}
