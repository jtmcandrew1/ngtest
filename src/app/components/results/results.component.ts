import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  status:string="not started";
  eventEarnings="";
  events: Tournament[]=[];
  selectedEvent: Tournament = null;  
  

  constructor(private _dataService:DataService, private _titleService: Title) { }

  ngOnInit() {

    this._titleService.setTitle('Results | the golf pool');

    this._dataService.getEvents().subscribe((events) => { 
      
      this.events = events;

    });   
  }


  updateEventResults(){    

    this.status = "processing";
    
      var lines = this.eventEarnings.replace(/\r\n/g, "\n").split("\n");      
      var results : Result[] = [];
  
       for(let line of lines){

         if(!line) continue;

          var lineArray = line.split("$");
          //console.log(result[0], "   " + result[1]); 

          var result : Result = {PlayerName : lineArray[0].trim(), Earnings : lineArray[1].trim(), EventId : this.selectedEvent.EventId.toString()};

          //alert(result.PlayerName + "," + result.Earnings + "," + result.EventId)
          
          results.push(result);         
          
    } 

    this._dataService.postEventResult(results).subscribe((response) => { 

      this.eventEarnings="";
      this.status = "finished";
      }); 

  }  

}

/* interface AuditResult{
  PlayerRankId:number  
  PlayerName:string  
  ResultEarnings:number
  SeasonEarnings:number
  EarningsDiff:number
} */

interface Result{
  PlayerName:string  
  Earnings:string
  EventId:string
  
}

interface Tournament{
  EventId:number
  EventName:string   
 
}
