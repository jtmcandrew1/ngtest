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

   public getWinners(year:string) : Observable<any> {
         return this.http.get("assets/json/winners.json")
                      .map((res: any) => {
                       
            return res.json().filter(winner => winner.Year === year);
               })} 
                 


public getStandings(divisionId) : Observable<any> { 

        return this.http.get(config.API_URL2 + "api/home/GetStandings/"+ "?divisionId=" + divisionId)
                    .map((res: any) => {                        
                      
                        return res.json();
              })} 

            //   public getStandings(divisionId) : Observable<any> {
            //     return this.http.get(config.API_URL2 + "api/home/GetStandings/"+ "?divisionId=" + divisionId)
            //                 .map((res: any) => {
                              
            //       return res.json(); 
            //           })}               


public getDivisions() : Observable<any> {
    return this.http.get("assets/json/divisions.json")
                .map((res: any) => {
                  
      return res.json();
          })} 


public getEvents() : Observable<any> {
    return this.http.get(config.API_URL2 + "api/home/GetEvents")
                .map((res: any) => {
                  
      return res.json();
          })}           

public getQuote() : Observable<any> {
         return this.http.get(config.API_URL2 + "api/home/GetQuote")
                      .map((res: any) => {                       
            return res.json(); 
               })}

public getLastUpdateTime() : Observable<any> {
         return this.http.get(config.API_URL2 + "api/home/GetLastUpdateTime")
                      .map((res: any) => {                       
            return res.json(); 
               })}

public getRssFeeds() : Observable<any> 
{
          return this.http.get(config.API_URL + "api/home/GetRssFeed")
                .map((res: any) => {
                  
      return res.json();
          })}   
       
          
public getPlayerCounts() : Observable<any> {
        return this.http.get(config.API_URL + "api/home/GetPlayerCounts")
                    .map((res: any) => {
                        
            return res.json();
                })} 
                  
public getPlayerEarnings(poolOnly) : Observable<any> {
        return this.http.get(config.API_URL2 + "api/home/GetPlayerEarnings" + "?poolOnly=" + poolOnly)
                    .map((res: any) => {
                        
            return res.json();
                })} 

public getPoolers() : Observable<any> {
        return this.http.get(config.API_URL2 + "api/home/GetPoolerList")
                    .map((res: any) => {
                        
            return res.json();
                })}   
                
public getPoolerCompareList(poolerId1, poolerId2) : Observable<any> {
    return this.http.get(config.API_URL2 + "api/home/GetPoolerCompareList" + "?addDropPeriod=" + config.ADD_DROP_PERIOD                                                                    
                                                + "&poolerId1=" + poolerId1
                                                + "&poolerId2=" + poolerId2)
                .map((res: any) => {
                    
        return res.json();
            })} 
            
public getActivePlayers() : Observable<any> {
    return this.http.get(config.API_URL2 + "api/home/getActivePlayerList")
                .map((res: any) => {
                    
        return res.json();
            })}  

public getWhosGotEmList(playersString) : Observable<any> {

    return this.http.get(config.API_URL2 + "api/home/GetWhosGotEmList"+ "?players=" + playersString + "&addDropPeriod=" + config.ADD_DROP_PERIOD  )                                                                  
                 .map((res: any) => {
                    
        return res.json();
            })}       
            
public verifySeasonTotals() : Observable<any> {
    return this.http.get(config.API_URL2 + "api/home/VerifySeasonTotals")
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
      url: config.API_URL2 + "api/home/EventResultPost",
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
    return this.http.get(config.API_URL2 + "api/home/TriggerSeasonResultsScraping")
                .map((res: any) => {
                    
        //return res.json();
            })} 

public getAllPlayers() : Observable<any> {
    return this.http.get(config.API_URL2 + "api/home/GetAllPlayers")
                .map((res: any) => {
                    
        return res.json();
            })} 
  
}


            
            
