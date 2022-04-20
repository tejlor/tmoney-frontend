import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/account';
import { AccountWithLastEntry } from 'src/app/model/accountWithLastEntry';
import { Entry } from 'src/app/model/entry';
import { AccountHttpService } from 'src/app/services/account.http.service';

@Component({
  selector: 'tm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  items: AccountWithLastEntry[];

  constructor(private accountHttpService: AccountHttpService) { 
    
  }

  ngOnInit(): void {
    this.accountHttpService.getSummary().subscribe(list => {this.items = list});
  }

}
