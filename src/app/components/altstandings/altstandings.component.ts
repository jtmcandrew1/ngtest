import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { DataService } from '../../services/data.service';
import * as config from '../../config';

@Component({
  selector: 'app-altstandings',
  templateUrl: './altstandings.component.html',
  styleUrls: ['./altstandings.component.css', '../../app.component.css']
})

export class AltstandingsComponent implements OnInit {

  standingsA: Pooler[]; 
  divisionsA: Division[] = [];
  divisionIdSelectedA; 

  standingsB: Pooler[]; 
  divisionsB: Division[] = [];
  divisionIdSelectedB; 

  standingsC: Pooler[]; 
  divisionsC: Division[] = [];
  divisionIdSelectedC; 

  loading = false;

  addDropPeriod = config.ADD_DROP_PERIOD;

  constructor(private _dataService: DataService, private _titleService: Title, private router: Router) { }

  ngOnInit() {

    if (config.REDIRECT_ON) this.router.navigate(['./home']);

    this._titleService.setTitle('AltStandings | the golf pool');  

    this._dataService.getDivisions().subscribe((divisions) => {

      this.divisionsA = divisions;
      this.divisionsB = divisions;
      this.divisionsC = divisions;

    });

    this.divisionIdSelectedA = 9;
    this.onDivisionAChange();

    this.divisionIdSelectedB = 2;
    this.onDivisionBChange();

    this.divisionIdSelectedC = 3;
    this.onDivisionCChange();
  }

  onDivisionAChange() {
    this.loading = true;

    this._dataService.getStandings(this.divisionIdSelectedA)
      .subscribe((standings) => {       

        this.loading = false;
        this.standingsA = standings;

      });
  }

  onDivisionBChange() {
    this.loading = true;

    this._dataService.getStandings(this.divisionIdSelectedB)
      .subscribe((standings) => {       

        this.loading = false;
        this.standingsB = standings;

      });
  }

  onDivisionCChange() {
    this.loading = true;

    this._dataService.getStandings(this.divisionIdSelectedC)
      .subscribe((standings) => {       

        this.loading = false;
        this.standingsC = standings;

      });
  }

}

interface Pooler {
  PoolerName: string,
  SumResults: number  
}

interface Division {
  Name: string,
  DivisionId: number
}
