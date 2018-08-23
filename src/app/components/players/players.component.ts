import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Router } from '@angular/router'

import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { REDIRECT_ON } from '../../config';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css', '../../app.component.css']
})
export class PlayersComponent implements OnInit {

  playerCounts: PlayerByCount[];
  playerLeaderboard: PlayerLeaderboard[];
  playerResults: PlayerByResults[];
  poolers: Pooler[] = [];
  poolerCompare1: Pooler;
  poolerCompare2: Pooler;

  listCompareAll: Player[];
  pooler1Players: Player[];
  pooler2Players: Player[];
  commonPlayers: Player[];

  playersAll: Player[] = [];
  playersWho: Player[] = [];
  poolersWho: Pooler[] = [];

  openChevron: string = 'fa fa-chevron-up';
  closeChevron: string = 'fa fa-chevron-down';
  poolOnly: number = 0;

  loading = false;

  constructor(public auth: AuthService, private _dataService: DataService, private _titleService: Title, private router: Router) { }

  ngOnInit() {


    if (REDIRECT_ON) this.router.navigate(['./home']);

    this.loading = true;

    this._titleService.setTitle('Players | the golf pool');


    this._dataService.getPlayerCounts().subscribe((playerCounts) => {
      this.playerCounts = playerCounts;
      this.loading = false;
    });

    

    this._dataService.getPoolers().subscribe((poolers) => {
      this.poolers = poolers;

      this.poolers.unshift({ PoolerName: 'select a pooler...', PoolerId: 0 })
      this.poolerCompare1 = this.poolers[0];
      this.poolerCompare2 = this.poolers[0];


    });

    this._dataService.getActivePlayers().subscribe((players) => {
      this.playersAll = players;     

    });
    
    this.refreshLeaderboard();
    this.onPoolOnlyChange();

  }

  refreshLeaderboard(){
    this._dataService.getPlayerLeaderboard().subscribe((playerLeaderboard) => {
      this.playerLeaderboard = playerLeaderboard;
      this.loading = false;
    });

  }

  onPoolOnlyChange() {
    this.loading = true;
    this._dataService.getPlayerEarnings(this.poolOnly).subscribe((playerResults) => {
      this.playerResults = playerResults;
      this.loading = false;
    });
  }

  onPoolerCompareChange() {
    this.pooler1Players = [];
    this.pooler2Players = [];
    this.commonPlayers = [];
    

    if (this.poolerCompare1 === this.poolerCompare2 || this.poolerCompare1.PoolerId === 0
      || this.poolerCompare2.PoolerId === 0) return;

    this.loading = true;

    this._dataService.getPoolerCompareList(this.poolerCompare1.PoolerId, this.poolerCompare2.PoolerId).subscribe((list) => {
      this.listCompareAll = list;

      this.pooler1Players = this.listCompareAll.filter(
        list => list.CompareStatus === 2);

      this.pooler2Players = this.listCompareAll.filter(
        list => list.CompareStatus === 3);

      this.commonPlayers = this.listCompareAll.filter(
        list => list.CompareStatus === 1);

        this.loading = false;

    });

  }

  addPlayerToWhoList(player: Player) {

    this.playersWho.push(player);

    var index = this.playersAll.findIndex(x => x.PlayerRankId == player.PlayerRankId);
    if (index > -1) {
      this.playersAll.splice(index, 1);
    }

    this.getWhosGotEmList();


    this.playersWho.sort(function (a, b) {
      if (a.PlayerName < b.PlayerName) return -1;
      if (a.PlayerName > b.PlayerName) return 1;
      return 0;
    })


  }

  removePlayerFromWhoList(player: Player) {

    this.playersAll.push(player);

    var index = this.playersWho.findIndex(x => x.PlayerRankId == player.PlayerRankId);
    if (index > -1) {
      this.playersWho.splice(index, 1);
    }

    this.getWhosGotEmList();

    this.playersAll.sort(function (a, b) {
      if (a.PlayerName < b.PlayerName) return -1;
      if (a.PlayerName > b.PlayerName) return 1;
      return 0;
    });

  }

  clearWhoPlayerList() {

    for (let player of this.playersWho) {
      this.playersAll.push(player);
    }

    //this.playersAll.concat(this.playersWho);

    this.playersWho = [];
    this.poolersWho = [];

    this.playersAll.sort(function (a, b) {
      if (a.PlayerName < b.PlayerName) return -1;
      if (a.PlayerName > b.PlayerName) return 1;
      return 0;
    });

  }

  getWhosGotEmList() {
    this.poolersWho = [];

    if (this.playersWho.length === 0) return;

    this.loading = true;

    var playersString = "";

    for (let result of this.playersWho) {
      playersString = playersString + result.PlayerRankId + ",";
    }

    playersString = playersString.replace(/,\s*$/, "");  //remove last comma

    this._dataService.getWhosGotEmList(playersString).subscribe((poolers) => {
      this.poolersWho = poolers;
      this.loading = false;

    });

  }
}

interface PlayerByCount {
  PlayerName: string
  PlayerCount: number
  PoolerSelections: PoolerSelection[],
  Open: false
}

interface PoolerSelection {
  Pooler: Pooler
}

interface Pooler {
  PoolerName: string
  PoolerId: number
}

interface PlayerByResults {
  PlayerName: string
  ResultsTotal: number
  Results: Event[],
  Open: false
}

interface Result {
  Event: Event
  Earnings: number
}

interface Event {
  EventName: string
}

interface Player {
  PlayerName: string
  PlayerRankId: number
  CompareStatus: number
}

interface PlayerLeaderboard {
  NameAndCount: string  
  ScoreText: string
  PositionText: string 
  ThruText: string
  PoolerSelections: PoolerSelection[],
  Open: false
}


