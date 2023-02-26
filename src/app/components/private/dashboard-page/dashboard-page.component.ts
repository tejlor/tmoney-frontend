import {Component, OnInit} from '@angular/core';
import {AccountSummary} from 'src/app/model/accountSummary';
import {Account} from 'src/app/model/account';
import {AccountHttpService} from 'src/app/services/account.http.service';

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

      const account = {
        name: 'Podsumowanie',
        color: '#0d76cd',
        icon: 'fa-solid fa-wallet'
      } as Account;

      const lastEntry = array.reduce((prev, curr) => prev.entry.compareTo(curr.entry) > 0 ? prev : curr).entry;
      this.summary = new AccountSummary(account, lastEntry);

      console.log(this.items);
    });
  }
}
