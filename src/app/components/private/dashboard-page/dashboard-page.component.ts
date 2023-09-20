import {Component, OnInit} from '@angular/core';
import {AccountSummary} from 'src/app/model/accountSummary';
import {Account} from 'src/app/model/account';
import {AccountHttpService} from 'src/app/services/account.http.service';
import * as _ from 'lodash';
import {Title} from '@angular/platform-browser';
import {TITLE_POSTFIX} from 'src/app/utils/constants';

@Component({
  selector: 'tm-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  items: AccountSummary[][];
  summary: AccountSummary;


  constructor(private titleService: Title,
              private accountHttpService: AccountHttpService) {

  }

  ngOnInit(): void {
    this.titleService.setTitle(`Panel zarządzający ${TITLE_POSTFIX}`);

    this.accountHttpService.getSummary().subscribe((array: AccountSummary[]) => {
      this.items = [];
      for (let item of array) {
        if (!item.account.orderNo) {
          continue;
        }
        let pos = item.account.orderNo.split('.');
        let row = Number(pos[0]) - 1;
        let col = Number(pos[1]) - 1;
        if (this.items[row] === undefined) {
          this.items[row] = [];
        }
        this.items[row][col] = item;
      }

      this.summary = array.find(as => as.account.code === 'SUMMARY');
    });
  }
}
