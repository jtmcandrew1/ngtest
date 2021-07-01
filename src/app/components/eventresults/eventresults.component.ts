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
  eventIdSelectedA;

  standingsB: Pooler[];
  eventsB: Event[] = [];
  eventIdSelectedB;

  standingsC: Pooler[];
  eventsC: Event[] = [];
  eventIdSelectedC;

  

  loading = false;

  constructor(private _dataService: DataService, private _titleService: Title, private router: Router) { }

  ngOnInit() {

    this._titleService.setTitle('Event Results | the golf pool');
        

    this._dataService.getEvents().subscribe((events) => {



      this.eventsA = events;
      this.eventsB = events;
      this.eventsC = events;

    });

    this.eventIdSelectedA = 1;
    this.onEventAChange();

    this.eventIdSelectedB = 1;
    this.onEventBChange();

    this.eventIdSelectedC = 1;
    this.onEventCChange();
  }

 

  onEventAChange() {
    this.loading = true;

    this._dataService.getEventStandings(this.eventIdSelectedA)
      .subscribe((standings) => {

        this.loading = false;
        this.standingsA = standings;

      });
  }

  onEventBChange() {
    this.loading = true;

    this._dataService.getEventStandings(this.eventIdSelectedB)
      .subscribe((standings) => {

        this.loading = false;
        this.standingsB = standings;

      });
  }

  onEventCChange() {
    this.loading = true;

    this._dataService.getEventStandings(this.eventIdSelectedC)
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
  Name: string,
  DivisionId: number
}

