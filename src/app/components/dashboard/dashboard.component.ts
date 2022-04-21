import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/account';
import { AccountWithEntry } from 'src/app/model/accountWithLastEntry';
import { Entry } from 'src/app/model/entry';
import { AccountHttpService } from 'src/app/services/account.http.service';

@Component({
  selector: 'tm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  items: AccountWithEntry[][];

  constructor(private accountHttpService: AccountHttpService) {

  }

  ngOnInit(): void {
    this.accountHttpService.getSummary().subscribe(array => {
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
      console.log(this.items);
    });
  }

}
