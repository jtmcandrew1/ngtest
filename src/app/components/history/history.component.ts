import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'

import { Router } from '@angular/router'

import { DataService } from '../../services/data.service';
import * as config from '../../config';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css', '../../app.component.css']
})
export class HistoryComponent implements OnInit {

  standingsA: Pooler[];
  divisionsA: Division[] = [];
  divisionIdSelectedA;

  standingsB: Pooler[];
  divisionsB: Division[] = [];
  divisionIdSelectedB;

  standingsC: Pooler[];
  divisionsC: Division[] = [];
  divisionIdSelectedC;

  //year: string = "2019";

  yearSelected: number

  years: any[];

  loading = false;

  constructor(private _dataService: DataService, private _titleService: Title, private router: Router) { }

  ngOnInit() {

    this._titleService.setTitle('History | the golf pool');
     
    this.years = config.YEARS.filter(obj => obj < config.CURRENT_YEAR);
    this.yearSelected = config.CURRENT_YEAR - 1;

    this._dataService.getDivisions().subscribe((divisions) => {

      this.divisionsA = divisions;
      this.divisionsB = divisions;
      this.divisionsC = divisions;

    });

    this.divisionIdSelectedA = 9;
    this.onDivisionAChange();

    this.divisionIdSelectedB = 1;
    this.onDivisionBChange();

    this.divisionIdSelectedC = 2;
    this.onDivisionCChange();
  }

  onYearChange() {
    this.onDivisionAChange();
    this.onDivisionBChange();
    this.onDivisionCChange();
  }

  onDivisionAChange() {
    this.loading = true;

    this._dataService.getHistory(this.yearSelected, this.divisionIdSelectedA)
      .subscribe((standings) => {

        this.loading = false;
        this.standingsA = standings;

      });
  }

  onDivisionBChange() {
    this.loading = true;

    this._dataService.getHistory(this.yearSelected, this.divisionIdSelectedB)
      .subscribe((standings) => {

        this.loading = false;
        this.standingsB = standings;

      });
  }

  onDivisionCChange() {
    this.loading = true;

    this._dataService.getHistory(this.yearSelected, this.divisionIdSelectedC)
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

interface Division {
  Name: string,
  DivisionId: number
}

