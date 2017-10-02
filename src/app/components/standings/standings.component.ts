import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { DataService } from '../../services/data.service';
import * as config from '../../config';


@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css', '../../app.component.css']
})
export class StandingsComponent implements OnInit {

  standings: Pooler[];
  divisions: Division[] = [];
  divisionIdSelected = 9;
  lastUpdate: string;

  openChevron: string = 'fa fa-chevron-up';
  closeChevron: string = 'fa fa-chevron-down';

  loading = false;

  addDropPeriod = config.ADD_DROP_PERIOD;


  constructor(private _dataService: DataService, private _titleService: Title, private router: Router) { }

  ngOnInit() {

    if (config.REDIRECT_ON) this.router.navigate(['./home']);


    this._titleService.setTitle('Standings | the golf pool');


    this._dataService.getLastUpdateTime().subscribe((time) => {

      this.lastUpdate = time;
    });


    this._dataService.getDivisions().subscribe((divisions) => {

      this.divisions = divisions;

    });

    this.divisionIdSelected = 9;
    this.onDivisionChange();

  }



  onDivisionChange() {
    this.loading = true;

    this._dataService.getStandings(this.divisionIdSelected)
      .subscribe((standings) => {

        this.loading = false;
        this.standings = standings;

      });
  }
}

interface Division {
  Name: string,
  DivisionId: number
}

interface Pooler {
  PoolerName: string,
  SumResults: number,
  DivisionStandings: DivisionStandings[],
  Open: false
}

interface DivisionStandings {
  PlayerDisplayName: string,
  Earnings: number
}


