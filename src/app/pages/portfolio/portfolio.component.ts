import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.css'],
    standalone: false
})
export class PortfolioComponent implements OnInit {  

  isLoading: boolean;

  constructor() { 
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

}
