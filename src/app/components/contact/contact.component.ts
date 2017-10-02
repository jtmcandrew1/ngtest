import { Component, OnInit } from '@angular/core';
import {CONTACT_EMAIL} from '../../config';
import {Title} from '@angular/platform-browser';
// import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  email = CONTACT_EMAIL;

  constructor(private _titleService: Title) { }
  
    ngOnInit() {
  
      this._titleService.setTitle('Contact | the golf pool');
  }

  OpenModal(){

    //this.popup.show();

  }

}
