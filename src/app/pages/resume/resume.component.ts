import { Component, OnInit } from '@angular/core';
declare function skills(): any;

@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html',
    styleUrls: ['./resume.component.css'],
    standalone: false
})
export class ResumeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    skills();
  }

}
