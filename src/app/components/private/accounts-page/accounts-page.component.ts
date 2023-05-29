import {Component, OnInit} from '@angular/core';
import {TableData} from 'src/app/model/tableData';
import {Account} from 'src/app/model/account';
import {ActivatedRoute, Router} from '@angular/router';
import {Path} from 'src/app/app-routing.module';
import {AccountHttpService} from 'src/app/services/account.http.service';
import {BaseTablePage} from '../_common/base-table-page';
import {Title} from '@angular/platform-browser';
import {TITLE_POSTFIX} from 'src/app/utils/constants';

@Component({
  selector: 'tm-accounts-page',
  templateUrl: './accounts-page.component.html',
  styleUrls: ['./accounts-page.component.scss']
})
export class AccountsPageComponent extends BaseTablePage implements OnInit {

  readonly Path = Path;

  tableData: TableData<Account>;


  constructor(router: Router,
              route: ActivatedRoute,
              private titleService: Title,
              private accountHttpService: AccountHttpService) {

    super(router, route);
  }

  ngOnInit(): void {
    this.titleService.setTitle(`Konta ${TITLE_POSTFIX}`);
    this.initTableParams('orderNo ASC');
    this.reloadTableRows();
  }

  onRowClick(account: Account): void {
    this.router.navigateByUrl(Path.account(account.code));
  }

  protected reloadTableRows() {
    this.accountHttpService.getTable(this.tableParams).subscribe(result => {
      this.tableData = result;
    });
  }

}
