import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { DataService } from '../../services/data.service';
import * as config from '../../config';


@Component({
  selector: 'app-eventstandings',
  templateUrl: './eventstandings.component.html',
  styleUrls: ['./eventstandings.component.css', '../../app.component.css']
})
export class EventStandingsComponent implements OnInit {

  standings: Pooler[];
  events: Event[] = [];
  eventIdSelected = 9;
  lastUpdate: string;

  openChevron: string = 'fa fa-chevron-up';
  closeChevron: string = 'fa fa-chevron-down';

  loading = false;

  addDropPeriod = config.ADD_DROP_PERIOD;


  constructor(private _dataService: DataService, private _titleService: Title, private router: Router) { }

  ngOnInit() {

    if (config.REDIRECT_ON) this.router.navigate(['./home']);


    this._titleService.setTitle('Event Standings | the golf pool');
    


    this._dataService.getEvents().subscribe((events) => {

      console.log(this.events);

      this.events = events;

    });

    this.eventIdSelected = 1;
    this.onEventChange();

  }



  onEventChange() {
    this.loading = true;

    this._dataService.getEventStandings(this.eventIdSelected)
      .subscribe((standings) => {       

        this.loading = false;
        this.standings = standings;

      });
  }
}

interface Event {
  EventName: string,
  EventId: number
}

 interface Pooler {
  PoolerName: string,
  SumResults: number,
  Results: Results[],
  Open: false
}

interface Results {
  PlayerName: string,
  Earnings: number
}



