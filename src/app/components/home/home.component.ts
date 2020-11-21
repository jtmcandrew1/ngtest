import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser'

import { DataService } from '../../services/data.service';
import * as config from '../../config';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../../app.component.css']
})
export class HomeComponent implements OnInit {
  winnersAll:Winner[];
  winners1:Winner={ Year:0, DivisionId:"", First:"", Second:"",  Third:""};
  winners2:Winner={ Year:0, DivisionId:"", First:"", Second:"",  Third:""};
  winners3:Winner={ Year:0, DivisionId:"", First:"", Second:"",  Third:""};
  winners4:Winner={ Year:0, DivisionId:"", First:"", Second:"",  Third:""};
  winners5:Winner={ Year:0, DivisionId:"", First:"", Second:"",  Third:""};
  winners6:Winner={ Year:0, DivisionId:"", First:"", Second:"",  Third:""};
  winners7:Winner={ Year:0, DivisionId:"", First:"", Second:"",  Third:""};
  winners8:Winner={ Year:0, DivisionId:"", First:"", Second:"",  Third:""};
  winners9:Winner={ Year:0, DivisionId:"", First:"", Second:"",  Third:""};
  winners10:Winner={ Year:0, DivisionId:"", First:"", Second:"",  Third:""};

  rssFeeds:any[];
  year:number;
  
  yearSelected: number

  years:any[];
  

  constructor(private _dataService:DataService, private _titleService: Title) { }
  
    ngOnInit() {
  
    this._titleService.setTitle('Home | the golf pool');

    this.years = config.YEARS
    this.yearSelected = config.CURRENT_YEAR - 1;   

    this._dataService.getWinners().subscribe((winners) => {      
        this.winnersAll = winners;  

        this.onYearChange();
        
        this.getRss();
    });   

  } 

  getRss(){

    this._dataService.getRssFeeds().subscribe((feeds) => {     
      this.rssFeeds = feeds;
    }); 

  }
  

 onYearChange()
{  
      this.winners1 = this.winnersAll.filter(
          winner => winner.DivisionId == '1' && winner.Year ==  this.yearSelected)[0];

      this.winners2 = this.winnersAll.filter(
        winner => winner.DivisionId == "2" && winner.Year ==  this.yearSelected)[0];
          
      this.winners3 = this.winnersAll.filter(
        winner => winner.DivisionId == "3" && winner.Year ==  this.yearSelected)[0];  
      
      this.winners4 = this.winnersAll.filter(
        winner => winner.DivisionId == "4" && winner.Year ==  this.yearSelected)[0];

      this.winners5 = this.winnersAll.filter(
        winner => winner.DivisionId == "5" && winner.Year ==  this.yearSelected)[0];
          
      this.winners6 = this.winnersAll.filter(
        winner => winner.DivisionId == "6" && winner.Year ==  this.yearSelected)[0];
      
      this.winners7 = this.winnersAll.filter(
        winner => winner.DivisionId == "7" && winner.Year ==  this.yearSelected)[0];

      this.winners8 = this.winnersAll.filter(
        winner => winner.DivisionId == "8" && winner.Year ==  this.yearSelected)[0];

      this.winners10 = this.winnersAll.filter(
          winner => winner.DivisionId == "10" && winner.Year ==  this.yearSelected)[0];
          
      this.winners9 = this.winnersAll.filter(
        winner => winner.DivisionId == "9" && winner.Year ==  this.yearSelected)[0];           
         

}
} 

interface Winner{
  Year:number,
  DivisionId:string,  
  First:string,
  Second:string,
  Third:string
}

interface Rss{
Title:string,
Url:string
}






