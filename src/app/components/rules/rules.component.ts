import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css','../../app.component.css']
})
export class RulesComponent implements OnInit {

  constructor(private _titleService: Title) { }
  
    ngOnInit() {
  
      this._titleService.setTitle('Rules | the golf pool');

    }

}
