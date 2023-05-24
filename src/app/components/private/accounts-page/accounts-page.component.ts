import {Component, OnInit} from '@angular/core';
import {TableData} from 'src/app/model/tableData';
import {TableParams} from 'src/app/model/tableParams';
import {Account} from 'src/app/model/account';
import {Router} from '@angular/router';
import {Path} from 'src/app/app-routing.module';
import {AccountHttpService} from 'src/app/services/account.http.service';

@Component({
  selector: 'tm-accounts-page',
  templateUrl: './accounts-page.component.html',
  styleUrls: ['./accounts-page.component.scss']
})
export class AccountsPageComponent implements OnInit {

  readonly Path = Path;

  tableData: TableData<Account>;
  tableParams: TableParams;

  constructor(private router: Router,
              private accountHttpService: AccountHttpService) {

  }

  ngOnInit(): void {
    this.tableParams = new TableParams();
    this.tableParams.pageNo = 0;
    this.tableParams.pageSize = 20;
    this.tableParams.sortBy = 'orderNo ASC';
    this.tableParams.filter = '';
    this.reloadTableRows();
  }

  onFilterChange(filterText: any) {
    if (typeof(filterText) !== 'string') { // may be object
      return;
    }
    this.tableParams.filter = filterText as string;
    this.addParamToUrlQuery({filterText});
    this.reloadTableRows();
  }

  onPageSizeChange(pageSize: number): void {
    this.tableParams.pageSize = pageSize;
    this.addParamToUrlQuery({pageSize});
    this.reloadTableRows();
  }

  onPageNoChange(pageNo: number): void {
    this.tableParams.pageNo = pageNo;
    this.addParamToUrlQuery({pageNo});
    this.reloadTableRows();
  }

  onRowClick(account: Account): void {
    this.router.navigateByUrl(Path.account(account.code));
  }

  private reloadTableRows() {
    this.accountHttpService.getTable(this.tableParams).subscribe(result => {
      this.tableData = result;
    });
  }

  private addParamToUrlQuery(param: any) {
    this.router.navigate([], {
      queryParams: param,
      queryParamsHandling: 'merge'
    });
  }

}
