import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

  quote:Quote ={QuoteText:" ", Author:" "};

  constructor(private _dataService:DataService) { }

  ngOnInit() {

    this._dataService.getQuote().subscribe((quote) => {     
    this.quote = quote;   
    }); 
  }

}

interface Quote{
QuoteText:string,
Author:string
}
