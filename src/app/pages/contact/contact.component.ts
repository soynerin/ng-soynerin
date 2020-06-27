import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  isLoading = true;
  currentYear: number;

  constructor() { }

  ngOnInit(): void {
    this.currentYear = moment().year();
  }

}
