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
  eventEarnings = "";
  events: Tournament[]=[];
  selectedEvent: Tournament = null;  
  results: any[]=[];
  eventId = "";
  

  constructor(private _dataService:DataService, private _titleService: Title) { }

  ngOnInit() {

    this._titleService.setTitle('Results | the golf pool');

    this._dataService.getEvents().subscribe((events) => { 
      
      this.events = events;

      this.selectedEvent = this.events.find(e => e.IsCurrentEvent === true);

      //this.selectedEvent = currentEvent;
      
    }); 

    //this.getEspnEventResults();
    
   
  }

  getEventResults(){

    this._dataService.getEventResults(this.selectedEvent.EventId.toString()).subscribe((results) => { 
      
      this.eventEarnings = results;

    }); 

  }

  getEventResults2(){

    console.log("here");

    console.log(this.eventId);

    this._dataService.getEventResults2(this.eventId).subscribe((results) => { 
      
      this.eventEarnings = results;

    }); 

  }

  getEspnEventResults(){

    this._dataService.getEspnEventResults().subscribe((results) => { 
      
      this.eventEarnings = results;

    }); 
    
  }

  updateCurrentEvent(){

    this._dataService.updateCurrentEvent(this.selectedEvent.EventId.toString()).subscribe((results) => { 
      
      this.status = "event set";

    }); 

  }


  updateEventResults(){    

    this.status = "processing";
    
      var lines = this.eventEarnings.replace(/\r\n/g, "\n").split("\n");      
      var results : Result[] = [];
  
       for(let line of lines){

         if(!line) continue;

         line = line.replace("&#039;", "'");
         line = line.replace("酶", "o");
         line = line.replace("谩", "a");
         line = line.replace("帽", "n");

         //Sebasti谩n Mu帽oz   

          var lineArray = line.split("$");
          
          var result : Result = {PlayerName : lineArray[0].trim(), Earnings : lineArray[1].trim(), EventId : this.selectedEvent.EventId.toString()};
               
          results.push(result);          
          
       }

    //console.log(results);    

    this._dataService.postEventResult(results).subscribe((response) => { 

      this.eventEarnings="";
      this.status = "finished";
      }); 

      return;

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
  IsCurrentEvent: boolean
 
}

