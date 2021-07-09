import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'

import { Router } from '@angular/router'

import { DataService } from '../../services/data.service';
import * as config from '../../config';

@Component({
  selector: 'app-playereventresults',
  templateUrl: './playereventresults.component.html',
  styleUrls: ['./playereventresults.component.css']
})
export class PlayerEventResultsComponent implements OnInit {

  standingsA: Player[];
  eventsA: Event[] = [];
  selectedEventIdA: number;

  standingsB: Player[];
  eventsB: Event[] = [];
  selectedEventIdB: number;

  standingsC: Player[];
  eventsC: Event[] = [];
  selectedEventIdC: number;

  

  loading = false;

  constructor(private _dataService: DataService, private _titleService: Title, private router: Router) { }

  ngOnInit() {

    this._titleService.setTitle('Player Event Results | the golf pool');
        

    this._dataService.getEvents().subscribe((events) => {

      this.eventsA = events;
      this.eventsB = events;
      this.eventsC = events;
    });

      this._dataService.getLatestEventId().subscribe((id) => {      

        this.selectedEventIdA = id;
        this.selectedEventIdB = id - 1;
        this.selectedEventIdC = id - 2;        

        this.onEventAChange();
        this.onEventBChange();
        this.onEventCChange(); 
    

    });    
  }

 

  onEventAChange() {
    this.loading = true;

    

    this._dataService.getPlayerResultsByEventId(this.selectedEventIdA)
      .subscribe((standings) => {

        this.loading = false;
        this.standingsA = standings;

      });
  }

  onEventBChange() {
    this.loading = true;

    this._dataService.getPlayerResultsByEventId(this.selectedEventIdB)
      .subscribe((standings) => {

        this.loading = false;
        this.standingsB = standings;

      });
  }

  onEventCChange() {
    this.loading = true;

    this._dataService.getPlayerResultsByEventId(this.selectedEventIdC)
      .subscribe((standings) => {

        this.loading = false;
        this.standingsC = standings;

      });
  }
}

interface Player {
  PlayerName: string,
  Earnings: number
}

interface Event {
  EventName: string,
  EventId: number,
  IsCurrentEvent: boolean
}


