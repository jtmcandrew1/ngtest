import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser'

import { DataService } from '../../services/data.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../../app.component.css']
})
export class HomeComponent implements OnInit {
  winnersAll:Winner[];
  winners1:Winner={ Year:"", Division:"", DivisionText:"", First:"", Second:"",  Third:""};
  winners2:Winner={ Year:"", Division:"", DivisionText:"", First:"", Second:"",  Third:""};;
  winners3:Winner={ Year:"", Division:"", DivisionText:"", First:"", Second:"",  Third:""};;
  winners4:Winner={ Year:"", Division:"", DivisionText:"", First:"", Second:"",  Third:""};;
  winners5:Winner={ Year:"", Division:"", DivisionText:"", First:"", Second:"",  Third:""};;
  winners6:Winner={ Year:"", Division:"", DivisionText:"", First:"", Second:"",  Third:""};;
  winners7:Winner={ Year:"", Division:"", DivisionText:"", First:"", Second:"",  Third:""};;
  winners8:Winner={ Year:"", Division:"", DivisionText:"", First:"", Second:"",  Third:""};;
  winners9:Winner={ Year:"", Division:"", DivisionText:"", First:"", Second:"",  Third:""};;

  rssFeeds:any[];
  year:string = "2017";

  
  yearSelected: string

  years:any[];
  

  constructor(private _dataService:DataService, private _titleService: Title) { }
  
    ngOnInit() {
  
      this._titleService.setTitle('Home | the golf pool');

    this.years = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"];    
    this.yearSelected = "2018";   

    this.onYearChange();

     this._dataService.getRssFeeds().subscribe((feeds) => {     
    this.rssFeeds = feeds;   
    });          

  } 
  

 onYearChange()
{
   this._dataService.getWinners(this.yearSelected).subscribe((winners) => {      
      this.winnersAll = winners;

      this.winners1 = this.winnersAll.filter(
          winner => winner.Division === "1")[0];

      this.winners2 = this.winnersAll.filter(
          winner => winner.Division === "2")[0];
          
      this.winners3 = this.winnersAll.filter(
          winner => winner.Division === "3")[0];  
      
      this.winners4 = this.winnersAll.filter(
          winner => winner.Division === "4")[0];

      this.winners5 = this.winnersAll.filter(
          winner => winner.Division === "5")[0];
          
      this.winners6 = this.winnersAll.filter(
          winner => winner.Division === "6")[0];  
      
      this.winners7 = this.winnersAll.filter(
          winner => winner.Division === "7")[0];

      this.winners8 = this.winnersAll.filter(
          winner => winner.Division === "8")[0];
          
      this.winners9 = this.winnersAll.filter(
          winner => winner.Division === "9")[0];           
      
       }); 


}
} 

interface Winner{
  Year:string,
  Division:string,
  DivisionText:string,
  First:string,
  Second:string,
  Third:string
}

interface Rss{
Title:string,
Url:string
}






