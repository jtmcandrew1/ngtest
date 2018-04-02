import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { DataService } from '../../services/data.service';
import * as config from '../../config';

@Component({
  selector: 'app-divisiondetail',
  templateUrl: './divisiondetail.component.html',
  styleUrls: ['./divisiondetail.component.css', '../../app.component.css']
})
export class DivisiondetailComponent implements OnInit {

  standings: Pooler[]; 
  divisions: Division[] = [];
  divisionIdSelected;   

  loading = false;

  addDropPeriod = config.ADD_DROP_PERIOD;

  constructor(private _dataService: DataService, private _titleService: Title, private router: Router) { }

  ngOnInit() {

    if (config.REDIRECT_ON) this.router.navigate(['./home']);

    this._titleService.setTitle('Division Detail | the golf pool');  

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
        
        this.standings =  standings.sort(function(a, b) {
          if(a.PoolerName < b.PoolerName) return -1;
          if(a.PoolerName > b.PoolerName) return 1;
      })

        this.loading = false;      

      });
  }

}



interface Pooler {
  PoolerName: string,
  SumResults: number,
  DivisionStandings: DivisionStandings[]
}

interface DivisionStandings {
  PlayerDisplayName: string,
  Earnings: number
}

interface Division {
  Name: string,
  DivisionId: number
}

