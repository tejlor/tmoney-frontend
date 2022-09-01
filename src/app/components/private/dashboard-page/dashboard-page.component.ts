import {Component, OnInit} from '@angular/core';
import {AccountWithEntry} from 'src/app/model/accountWithLastEntry';
import {Entry} from 'src/app/model/entry';
import {AccountHttpService} from 'src/app/services/account.http.service';

@Component({
  selector: 'tm-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  items: AccountWithEntry[][];
  lastEntry: Entry;

  constructor(private accountHttpService: AccountHttpService) {

  }

  ngOnInit(): void {
    this.accountHttpService.getSummary().subscribe((array: AccountWithEntry[]) => {
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

      this.lastEntry = array.reduce((prev, curr) => prev.entry.compareTo(curr.entry) > 0 ? prev : curr).entry;
    });
  }
}
