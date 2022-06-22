import { HtmlParser } from '@angular/compiler';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {instanceToPlain, plainToInstance, serialize} from 'class-transformer';
import {TokenInfo} from './model/tokenInfo';
import { AccountHttpService } from './services/account.http.service';
import {EntryHttpService} from './services/entry.http.service';
import {OAuthHttpService} from './services/oauth.http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'tmoney';

  @ViewChild('myOverlay') myOverlay: ElementRef;
  @ViewChild('mySidebar') mySidebar: ElementRef;

  constructor(
    private accountHttpService: AccountHttpService,
    private oathHttpService: OAuthHttpService,
    private entryHttpService: EntryHttpService) {
  }

  w3_open(): void {
    if (this.mySidebar.nativeElement.style.display === 'block') {
      this.mySidebar.nativeElement.style.display = 'none';
      this.myOverlay.nativeElement.style.display = "none";
    } else {
      this.mySidebar.nativeElement.style.display = 'block';
      this.myOverlay.nativeElement.style.display = "block";
    }
  }

  w3_close(): void {
    this.mySidebar.nativeElement.style.display = "none";
    this.myOverlay.nativeElement.style.display = "none";
  }

  updateBalances():void {
    this.entryHttpService.updateBalances().subscribe();
  }

  login() {
    this.oathHttpService.getAccessToken('tejlor@wp.pl', '123456').subscribe(res => {
      console.log(res);
      localStorage.setItem('token', JSON.stringify(instanceToPlain(res)));
    });
  }

  refresh() {
    const token = plainToInstance(TokenInfo, JSON.parse(localStorage.getItem('token')));
    this.oathHttpService.refreshToken(token.refreshToken).subscribe(res => console.log(res));
  }

}
