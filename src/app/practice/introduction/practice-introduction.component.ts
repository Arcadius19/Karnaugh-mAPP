import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-practice-introduction',
  templateUrl: './practice-introduction.component.html',
  styleUrls: ['./practice-introduction.component.css']
})
export class PracticeIntroductionComponent implements OnInit {

  ex1active: boolean;
  ex2active: boolean;
  ex3active: boolean;
  ex4active: boolean;
  ex5active: boolean;
  ex6active: boolean;

  constructor() { }

  ngOnInit() {
  }

}
