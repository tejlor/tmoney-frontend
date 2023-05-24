import {Component, OnInit} from '@angular/core';
import {AccountSummary} from 'src/app/model/accountSummary';
import {Account} from 'src/app/model/account';
import {AccountHttpService} from 'src/app/services/account.http.service';
import * as _ from 'lodash';

@Component({
  selector: 'tm-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  items: AccountSummary[][];
  summary: AccountSummary;

  
  constructor(private accountHttpService: AccountHttpService) {

  }

  ngOnInit(): void {
    this.accountHttpService.getSummary().subscribe((array: AccountSummary[]) => {
      this.items = [];
      for (let item of array) {
        let pos = item.account.orderNo.split('.');
        let row = Number(pos[0]) - 1;
        let col = Number(pos[1]) - 1;
        if (this.items[row] === undefined) {
          this.items[row] = [];
        }
        this.items[row][col] = item;
      }

      const lastEntry = _.chain(array)
        .filter(as => as.account.includeInSummary === true)
        .map(as => as.entry)
        .maxBy(entry => entry.date + ':' + entry.id)
        .value();

      this.summary = new AccountSummary(Account.summary(), lastEntry);
    });
  }
}
