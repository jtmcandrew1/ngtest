import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';



import {Observable} from 'rxjs/Rx';
// import {PopupModule } from 'ng2-opd-popup';
//import {MdDialog} from '@angular/material';


import { AppComponent } from './app.component';
import { StandingsComponent } from './components/standings/standings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { RulesComponent } from './components/rules/rules.component';
import { EventsComponent } from './components/events/events.component';
import { HistoryComponent } from './components/history/history.component';
import { QuoteComponent } from './components/quote/quote.component';
import { ContactComponent } from './components/contact/contact.component';
import { PlayersComponent } from './components/players/players.component';
import { AuditComponent } from './components/audit/audit.component';
import { ResultsComponent } from './components/results/results.component';
import { PicksComponent } from './components/picks/picks.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AdddropComponent } from './components/adddrop/adddrop.component';
import { AltstandingsComponent } from './components/altstandings/altstandings.component';
import { DivisiondetailComponent } from './components/divisiondetail/divisiondetail.component';

import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { EventResultsComponent } from './components/eventresults/eventresults.component';
import { EventStandingsComponent } from './components/eventstandings/eventstandings.component';

const appRoutes: Routes = [
{path:'footer', component:FooterComponent},  
{path:'', component:HomeComponent}, 
{path:'home', component:HomeComponent},
{path:'standings', component:StandingsComponent},
{path:'altstandings', component:AltstandingsComponent},
{path:'divisiondetail', component:DivisiondetailComponent},
{path:'rules', component:RulesComponent},
{path:'events', component:EventsComponent},
{path:'history', component:HistoryComponent},
{path:'contact', component:ContactComponent},
{path:'players', component:PlayersComponent},
{path:'audit', component:AuditComponent},
{path:'results', component:ResultsComponent},
{path:'picks', component:PicksComponent},
{path:'adddrop', component:AdddropComponent},
{path:'eventresults', component:EventResultsComponent},
{path:'eventstandings', component:EventStandingsComponent},
{path: '**', redirectTo: '', pathMatch: 'full' }
];

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}


@NgModule({
  declarations: [
    AppComponent,
    StandingsComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    RulesComponent,
    EventsComponent,
    HistoryComponent,
    QuoteComponent,
    ContactComponent,
    PlayersComponent,
    AuditComponent,
    ResultsComponent,
    PicksComponent,
    SpinnerComponent,
    AdddropComponent,
    AltstandingsComponent,
    DivisiondetailComponent,
    EventResultsComponent,
    EventStandingsComponent
   
    
   
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule
    // PopupModule.forRoot()
  ],
  providers: [DataService
    ,AuthService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }    
    ,Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
