import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as xml2js from 'xml2js';
import {Parser} from 'xml2js';
import { AuthHttp } from 'angular2-jwt';


import * as config from '../config';
//import {API_URL2} from '../config';
//import {ADD_DROP_PERIOD} from '../config';

//const apiUrl = ""


@Injectable()
export class DataService {

message: string;   

  constructor(private http:Http, public authHttp: AuthHttp) { }

   public getWinnersJson(year:string) : Observable<any> {
         return this.http.get("assets/json/winners.json")
                      .map((res: any) => {
                       
            return res.json().filter(winner => winner.Year === year);
               })} 
                 
   public getWinners() : Observable<any> {
        return this.http.get(config.API_URL3 + "GetWinners")
                        .map((res: any) => {
                        
            return res.json();
                })} 

    public getHistory(year, division) : Observable<any> {
        return this.http.get(config.API_URL3 + "GetHistory" + "?year=" + year + "&division=" + division)
                        .map((res: any) => {
                        
            return res.json();
                })} 

public getStandings(divisionId) : Observable<any> { 

       // return this.http.get(config.API_URL2 + "api/home/GetStandings/"+ "?divisionId=" + divisionId + "&addDropPeriod=" + config.ADD_DROP_PERIOD)
       return this.http.get(config.API_URL3 + "GetStandings" + "?divisionId=" + divisionId + "&addDropPeriod=" + config.ADD_DROP_PERIOD)
                    .map((res: any) => {       
                      
                        return res.json();
              })} 

            //   public getStandings(divisionId) : Observable<any> {
            //     return this.http.get(config.API_URL2 + "api/home/GetStandings/"+ "?divisionId=" + divisionId)
            //                 .map((res: any) => {
                              
            //       return res.json(); 
            //           })}    
            
public getEventStandings(eventId) : Observable<any> { 

    // return this.http.get(config.API_URL2 + "api/home/GetStandings/"+ "?divisionId=" + divisionId + "&addDropPeriod=" + config.ADD_DROP_PERIOD)
    return this.http.get(config.API_URL3 + "GetEventStandings" + "?eventId=" + eventId + "&addDropPeriod=" + config.ADD_DROP_PERIOD)
                    .map((res: any) => {       
                    
                        return res.json();
            })} 


public getDivisions() : Observable<any> {
    return this.http.get("assets/json/divisions.json")
                .map((res: any) => {
                  
      return res.json();
          })} 


public getEvents() : Observable<any> {
    return this.http.get(config.API_URL3 + "GetEvents")
                .map((res: any) => {
                  
      return res.json();
          })}           

public getQuote() : Observable<any> {
         return this.http.get(config.API_URL3 + "GetQuote")
                      .map((res: any) => {                       
            return res.json(); 
               })}

public getSettings() : Observable<any> {
        return this.http.get(config.API_URL3 + "GetSettings")
                .map((res: any) => {                       
        return res.json(); 
        })}

public getLastUpdateTime() : Observable<any> {
         return this.http.get(config.API_URL3 + "GetLastUpdateTime")
                      .map((res: any) => {                       
            return res.json(); 
               })}

public getRssFeeds() : Observable<any> 
{
          return this.http.get(config.API_URL3 + "GetRssFeed")
                .map((res: any) => {
                  
      return res.json();
          })}   
       
          
public getPlayerCounts() : Observable<any> {
        return this.http.get(config.API_URL3 + "GetPlayerCounts" + "?addDropPeriod=" + config.ADD_DROP_PERIOD)
                    .map((res: any) => {
                        
            return res.json();
                })} 

public getPlayerLeaderboard() : Observable<any> {
    return this.http.get(config.API_URL3 + "GetPlayerLeaderboard" + "?addDropPeriod=" + config.ADD_DROP_PERIOD)
                .map((res: any) => {
                    
        return res.json();
            })}                 
                  
public getPlayerEarnings(poolOnly) : Observable<any> {
        return this.http.get(config.API_URL3 + "GetPlayerEarnings" + "?poolOnly=" + poolOnly)
                    .map((res: any) => {
                        
            return res.json();
                })} 

public getPoolers() : Observable<any> {
        return this.http.get(config.API_URL3 + "GetPoolerList")
                    .map((res: any) => {
                        
            return res.json();
                })}   
                
public getPoolerCompareList(poolerId1, poolerId2) : Observable<any> {
    return this.http.get(config.API_URL3 + "GetPoolerCompareList" + "?addDropPeriod=" + config.ADD_DROP_PERIOD                                                                    
                                                + "&poolerId1=" + poolerId1
                                                + "&poolerId2=" + poolerId2)
                .map((res: any) => {
                    
        return res.json();
            })} 
            
public getActivePlayers() : Observable<any> {
    return this.http.get(config.API_URL3 + "GetActivePlayerList" + "?addDropPeriod=" + config.ADD_DROP_PERIOD)
                .map((res: any) => {
                    
        return res.json();
            })}  

public getWhosGotEmList(playersString) : Observable<any> {

    return this.http.get(config.API_URL3 + "GetWhosGotEmList"+ "?players=" + playersString + "&addDropPeriod=" + config.ADD_DROP_PERIOD  )                                                                  
                 .map((res: any) => {
                    
        return res.json();
            })}       
            
public verifySeasonTotals() : Observable<any> {
    return this.http.get(config.API_URL3 + "VerifySeasonTotals")
                .map((res: any) => {
                    
        return res.json();
            })}              

     

/* public postSeasonTotalResult(results) : Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(API_URL + "api/home/SeasonTotalResultPost", results, options)
              // .map(this.extractData)
              // .catch(this.handleErrorObservable);
            }    
            
            
} */

public postEventResult(results : any[]) {
 console.log(JSON.stringify(results));

    let requestOptions = new RequestOptions({
      method: RequestMethod.Post,
      url: config.API_URL3 + "EventResultPost",
      headers: this.getHeaders(),
      
      body: JSON.stringify(results)

    });
    return this.http.request(new Request(requestOptions))
        .map(res => res.json());
  }

  public postPicks(results : any) {
    console.log(JSON.stringify(results));
   
       let requestOptions = new RequestOptions({
         method: RequestMethod.Post,
         url: config.API_URL3 + "PicksPost",
         headers: this.getHeaders(),
         
         body: JSON.stringify(results)
   
       });
       return this.http.request(new Request(requestOptions))
           .map(res => res.json());
     }

  getHeaders() {
    return new Headers({
        "Content-Type": "application/json", "Accept": "application/json"
    });
}

 /*  public populateSeasonResults() : Observable<any> {
    return this.http.get(API_URL + "api/home/GetSeasonResults")
                .map((res: any) => {
                    
        return res.json();
            })}  
             */
            
public triggerSeasonResultsScrapeProcess() : Observable<any> {
    return this.http.get(config.API_URL3 + "TriggerSeasonResultsScraping")
                .map((res: any) => {
                    
        //return res.json();
            })} 

public getAllPlayers() : Observable<any> {
    return this.http.get(config.API_URL3 + "GetAllPlayers")
                .map((res: any) => {
                    
        return res.json();
            })} 


public getEspnEventResults() : Observable<any> {
    return this.http.get(config.API_URL3 + "GetEspnEventResults")
                .map((res: any) => {
                    
        return res.json();
            })}  
            
            
public getEventResults(eventId) : Observable<any> {
    return this.http.get(config.API_URL3 + "GetEventResults" + "?eventId=" + eventId)
                .map((res: any) => {
                    
        return res.json();
            })}      
            
            
public getEventResults2(eventId) : Observable<any> {

    console.log(eventId);
    return this.http.get(config.API_URL3 + "GetEventResults2" + "?eventId=" + eventId)
                .map((res: any) => {
                    
        return res.json();
            })}     

 public updateCurrentEvent(eventId) : Observable<any> {
                return this.http.get(config.API_URL3 + "UpdateCurrentEvent" + "?eventId=" + eventId)
                            .map((res: any) => {
                                
                    //return res.json();
                        })}  



public getDropPlayers(poolerId) : Observable<any> {
    return this.http.get(config.API_URL3 + "GetDropPlayers" + "?poolerId=" + poolerId)
                    .map((res: any) => {
                        
            return res.json();
                })} 

public getAddPlayers(poolerId) : Observable<any> {
    return this.http.get(config.API_URL3 + "GetAddPlayers" + "?poolerId=" + poolerId)
    .map((res: any) => {
        
        return res.json();
})} 

public postAddDrop(poolerId, dropPlayerRankId, addPlayerRankId) : Observable<any> {
    return this.http.get(config.API_URL3 + "PostAddDrop" + "?poolerId=" + poolerId + "&dropPlayerRankId=" + dropPlayerRankId + "&addPlayerRankId=" + addPlayerRankId)
    .map((res: any) => {
        
        return res.json();
})} 
  
}


            
            
