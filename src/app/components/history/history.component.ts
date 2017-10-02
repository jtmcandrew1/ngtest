import { Component, OnInit } from '@angular/core';
import { Title} from '@angular/platform-browser'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css','../../app.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private _titleService: Title) { }
  
    ngOnInit() {
  
      this._titleService.setTitle('History | the golf pool');
  }

}
