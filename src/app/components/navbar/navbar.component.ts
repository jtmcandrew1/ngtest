import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  hamburgerMenuOpen = false;

  constructor(private _dataService:DataService) { }

  lastUpdate: string;

  ngOnInit() {

     this._dataService.getLastUpdateTime().subscribe((time) => { 
    
    this.lastUpdate = time;     

    });  
  }

}
