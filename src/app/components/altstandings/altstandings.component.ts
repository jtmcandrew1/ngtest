import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { DataService } from '../../services/data.service';
import * as config from '../../config';

@Component({
  selector: 'app-altstandings',
  templateUrl: './altstandings.component.html',
  styleUrls: ['./altstandings.component.css']
})

export class AltstandingsComponent implements OnInit {

  standings: Pooler[]; 
  divisions: Division[] = [];
  divisionIdSelected = 9;
  lastUpdate: string;  

  loading = false;

  addDropPeriod = config.ADD_DROP_PERIOD;

  constructor(private _dataService: DataService, private _titleService: Title, private router: Router) { }

  ngOnInit() {

    if (config.REDIRECT_ON) this.router.navigate(['./home']);


    this._titleService.setTitle('AltStandings | the golf pool');   


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

interface Pooler {
  PoolerName: string,
  SumResults: number  
}

interface Division {
  Name: string,
  DivisionId: number
}
