import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  
  auditResults:AuditResult[]=[];
  status = "not started";
  

  constructor(private _dataService:DataService, private _titleService: Title) { }

  ngOnInit() {

    this._titleService.setTitle('Audit | the golf pool');

  }

  triggerSeasonResults(){ 
    
    this.status = "processing";
    
    this._dataService.triggerSeasonResultsScrapeProcess().subscribe((response) => {     
      //this.auditResults = differences;   
      }); 

      this.status = "finished"; 
          
    } 
  

  verifySeasonResults(){ 
    this._dataService.verifySeasonTotals().subscribe((results) => {     
      this.auditResults = results;   
      });  

      this.status = "verified"; 

  }

}

interface AuditResult{
  PlayerRankId:number  
  PlayerName:string  
  ResultEarnings:number
  SeasonEarnings:number
  EarningsDiff:number
}

interface Result{
  PlayerName:string  
  Earnings:string
}
