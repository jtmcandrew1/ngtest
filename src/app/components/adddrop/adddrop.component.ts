
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { DataService } from '../../services/data.service';
import * as config from '../../config';

@Component({
  selector: 'app-adddrop',
  templateUrl: './adddrop.component.html',
  styleUrls: ['./adddrop.component.css', '../../app.component.css']
})
export class AdddropComponent implements OnInit {

  settings: Settings;

  poolers: Pooler[] = [];
  poolerIdSelected = 0;

  dropPlayers: Player[] = [];
  addPlayers: Player[] = [];

  dropPlayerIdSelected = 0;
  addPlayerIdSelected = 0;

  loading = false;
  isValid = false;
  success = false;  

  constructor(private _dataService: DataService, private _titleService: Title, private router: Router) { }

  ngOnInit() {  

    if (!config.CAN_ADD_DROP) this.router.navigate(['./home']);

    this._titleService.setTitle('Add Drop | the golf pool');    


    this._dataService.getPoolers().subscribe((poolers) => {

      this.poolers = poolers;
      // this.poolers.unshift({ PoolerName: 'select a pooler...', PoolerId: 0 })
      // this.poolerIdSelected = 0; 

    });   

  }

  onPoolerChange() {
   
    this.loading = true;

    this._dataService.getDropPlayers(this.poolerIdSelected)
      .subscribe((dropPlayers) => {       

        this.loading = false;
        this.dropPlayers = dropPlayers;            

      });

      this._dataService.getAddPlayers(this.poolerIdSelected)
      .subscribe((addPlayers) => {       

        this.loading = false;
        this.addPlayers = addPlayers; 

        this.isValid = false;
        this.dropPlayerIdSelected = 0;
        this.addPlayerIdSelected = 0;

      });

     
  }

  submitChanges()
  {
      
    this._dataService.postAddDrop(this.poolerIdSelected, this.dropPlayerIdSelected, this.addPlayerIdSelected).subscribe((response) => {       
            
            }); 

      this.success = true;    

  }

  validate()
  {
    this.isValid = this.addPlayerIdSelected != 0 && this.dropPlayerIdSelected && this.poolerIdSelected !=0;

  }

}

interface Pooler {
  PoolerName: string,
  PoolerId: number
  
}

interface Player {
  PlayerName: string,
  PlayerRankId: number
  
}
