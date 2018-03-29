import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Title} from "@angular/platform-browser";
import { Router } from '@angular/router'

import { DataService } from '../../services/data.service';
import * as config from '../../config';

@Component({
  selector: 'app-picks',
  templateUrl: './picks.component.html',
  styleUrls: ['./picks.component.css']
})
export class PicksComponent implements OnInit {  

    playersAll:Player[] = [];  
    playersPicked: Player[] = []; 
    playersFiltered: Player[] = []  
    searchText = "";
    errorList:string[] = [];

    pickForm:FormGroup;
    post:any;
    name:string="";   
    valid:boolean = null;
    success:boolean = false;  


  constructor(private _dataService:DataService, private _titleService:Title, private router: Router,
                private fb:FormBuilder) { 

  if (!config.CAN_MAKE_PICKS) this.router.navigate(['./home']);

  var emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
                  
      
      this.pickForm = fb.group({
            'name': [null, Validators.required],
            'email': [null, Validators.compose([
                      Validators.required,
                      //Validators.pattern('[\\w\\-\\s\\/]+')
                      Validators.pattern(emailRegex)
            ])],
            'comments': [null, null],
            'valid':['', Validators.required]
      })
  } 
  
  ngOnInit() {

    this._titleService.setTitle('Picks | the golf pool');

    this._dataService.getAllPlayers().subscribe((players) => {     
      this.playersAll = players; 

      this.filterPlayers();
    });     
  }

  

  addPicks(post)
  {
      this.name = post.name;
      var pick : Pick = {Name : post.name, 
                          Email : post.email, 
                          Comments : post.comments,
                          PoolerSelections: this.playersPicked                        
                        };

    this._dataService.postPicks(pick).subscribe((response) => {       
            
            }); 

      this.success = true;    

  }

  filterPlayers(){  

    this.playersFiltered = this.playersAll.filter(player => {
      return player.PlayerNameAndRank.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }   

  addPlayerToPickedList(player: Player){

    if(this.playersPicked.length === 15) return;
    
      this.playersPicked.push(player);
    
      var index = this.playersAll.findIndex(x => x.PlayerRankId==player.PlayerRankId);
      if (index > -1) {
        this.playersAll.splice(index, 1);
      }    

      this.playersPicked.sort(function(a, b){
        if(a.PlayerRankId < b.PlayerRankId) return -1;
        if(a.PlayerRankId > b.PlayerRankId) return 1;
        return 0;
      })  

      this.filterPlayers();

      if(this.playersPicked.length === 15) this.validatePicks();    
    }
    
    removePlayerFromPickedList(player: Player){     
    
      this.playersAll.push(player);
    
      var index = this.playersPicked.findIndex(x => x.PlayerRankId==player.PlayerRankId);
      if (index > -1) {
        this.playersPicked.splice(index, 1);
      }    

      this.playersAll.sort(function(a, b){
        if(a.PlayerRankId < b.PlayerRankId) return -1;
        if(a.PlayerRankId > b.PlayerRankId) return 1;
        return 0;
    });

      this.filterPlayers();
      this.clearErrorList();  
      
      this.valid = null;
    }
    
    clearPlayerPickedList(){  
    
      for(let player of this.playersPicked){
        this.playersAll.push(player);     
      }   
      
      this.playersPicked = [];
    
      this.playersAll.sort(function(a, b){
        if(a.PlayerRankId < b.PlayerRankId) return -1;
        if(a.PlayerRankId > b.PlayerRankId) return 1;
        return 0;
    });  

    this.clearSearchFilter();  
    this.clearErrorList();

    this.valid = null;  
      
    }  
    
    clearSearchFilter(){

      this.searchText = "";      
      this.filterPlayers();      
    }

    validatePicks(){
      
     
      // if (!this.pickForm.controls['email'].valid)
      // {
      //   this.errorList.push("Error: valid email is required!");
      // }


      var playersFirstGroup= this.playersPicked.filter(
        players => players.PlayerRankId >=1 && players.PlayerRankId <= 5);

      var playersSecondGroup= this.playersPicked.filter(
        players => players.PlayerRankId >=6 && players.PlayerRankId <= 10);  

      var playersThirdGroup= this.playersPicked.filter(
        players => players.PlayerRankId >=11 && players.PlayerRankId <= 15);  
            
       var playersFourthGroup= this.playersPicked.filter(
         players => players.PlayerRankId >=16 && players.PlayerRankId <= 20); 

      //alert(playersFirstGroup.length);
        if (playersFirstGroup.length > 2)
          this.errorList.push("Error: more than two players ranked 1-5 picked!");

        if (playersSecondGroup.length > 2)
          this.errorList.push("Error: more than two players ranked 6-10 picked!");

        if (playersThirdGroup.length > 2)
          this.errorList.push("Error: more than two players ranked 11-15 picked!");

        if (playersFourthGroup.length > 2)
          this.errorList.push("Error: more than two players ranked 16-20 picked!");
        
        if (this.errorList.length === 0) this.valid = true;

    }

    clearErrorList(){

      this.errorList = [];
    }

  }

interface Player {
  PlayerRankId:number,
  PlayerName:string,
  PlayerNameAndRank:string
}


interface Pick {
  Name:string,
  Email:string,
  Comments:string,
  PoolerSelections:Player[]
}


