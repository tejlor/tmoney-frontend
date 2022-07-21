import {Component, Input, OnInit} from '@angular/core';
import {Account} from 'src/app/model/account';
import {Category} from 'src/app/model/category';
import {AccountService} from 'src/app/services/account.service';
import {bit} from 'src/app/utils/utils';

@Component({
  selector: 'tm-account-badges',
  templateUrl: './account-badges.component.html',
  styleUrls: ['./account-badges.component.scss']
})
export class AccountBadgesComponent implements OnInit {

  @Input() category: Category;

  accountNames: string[];

  constructor(
    private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.activeAccounts$.subscribe(accounts => {
      this.accountNames = accounts
      .filter(account => this.isAccountSelected(account))
      .map(account => account.name);
    });
  }

  isAccountSelected(account: Account): boolean {
    return (this.category.account & bit(account.id)) !== 0;
  }
}
