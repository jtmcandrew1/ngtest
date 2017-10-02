import { Component, OnInit } from '@angular/core';
import { Title} from '@angular/platform-browser'
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  eventsAll:any[];
  events1:any[];
  events2:any[];
  events3:any[];
  events4:any[];


  constructor(private _dataService:DataService, private _titleService: Title,
                    public _authService:AuthService) { }
  
    ngOnInit() {
  
     this._titleService.setTitle('Events | the golf pool');

    this._dataService.getEvents().subscribe((events) => { 
          
      this.eventsAll = events;      

      this.events1 = this.eventsAll.filter(
          winner => winner.Division === 1);

      this.events2 = this.eventsAll.filter(
          winner => winner.Division === 2); 

      this.events3 = this.eventsAll.filter(
          winner => winner.Division === 3);
          
      this.events4 = this.eventsAll.filter(
          winner => winner.Division === 4);               
      
       });
      
  }  

}
