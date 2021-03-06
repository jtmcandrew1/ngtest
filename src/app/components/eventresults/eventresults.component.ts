import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'

import { Router } from '@angular/router'

import { DataService } from '../../services/data.service';
import * as config from '../../config';

@Component({
  selector: 'app-eventresults',
  templateUrl: './eventresults.component.html',
  styleUrls: ['./eventresults.component.css']
})
export class EventResultsComponent implements OnInit {

  standingsA: Pooler[];
  eventsA: Event[] = [];
  selectedEventIdA: number;

  standingsB: Pooler[];
  eventsB: Event[] = [];
  selectedEventIdB: number;

  standingsC: Pooler[];
  eventsC: Event[] = [];
  selectedEventIdC: number;

  

  loading = false;

  constructor(private _dataService: DataService, private _titleService: Title, private router: Router) { }

  ngOnInit() {

    this._titleService.setTitle('Event Results | the golf pool');
        

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

    

    this._dataService.getEventStandings(this.selectedEventIdA)
      .subscribe((standings) => {

        this.loading = false;
        this.standingsA = standings;

      });
  }

  onEventBChange() {
    this.loading = true;

    this._dataService.getEventStandings(this.selectedEventIdB)
      .subscribe((standings) => {

        this.loading = false;
        this.standingsB = standings;

      });
  }

  onEventCChange() {
    this.loading = true;

    this._dataService.getEventStandings(this.selectedEventIdC)
      .subscribe((standings) => {

        this.loading = false;
        this.standingsC = standings;

      });
  }
}

interface Pooler {
  PoolerName: string,
  Earnings: number
}

interface Event {
  EventName: string,
  EventId: number,
  IsCurrentEvent: boolean
}

