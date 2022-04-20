import { HtmlParser } from '@angular/compiler';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AccountHttpService } from './services/account.http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'tmoney';

  constructor(private accountHttpService: AccountHttpService) {
  }

}
