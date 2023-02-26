import {Component, OnInit} from '@angular/core';
import {TableData} from 'src/app/model/tableData';
import {TableParams} from 'src/app/model/tableParams';
import {Category} from 'src/app/model/category';
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

  tableData: TableData<Account>;

  private tableParams: TableParams;

  constructor(private router: Router,
              private accountHttpService: AccountHttpService) {

  }

  ngOnInit(): void {
    this.tableParams = new TableParams();
    this.tableParams.pageNo = 0;
    this.tableParams.pageSize = 10;
    this.tableParams.sortBy = 'orderNo ASC';
    this.tableParams.filter = '';
    this.reloadTableRows();
  }

  search(filterText: string) {
    this.tableParams.filter = filterText;
    this.reloadTableRows();
  }

  onPageSizeChange(pageSize: number): void {
    this.tableParams.pageSize = pageSize;
    this.reloadTableRows();
  }

  onPageChange(pageNo: number): void {
    this.tableParams.pageNo = pageNo;
    this.reloadTableRows();
  }

  onAddClick(): void {
    this.router.navigateByUrl(Path.account(null));
  }

  onRowClick(account: Account): void {
    this.router.navigateByUrl(Path.account(account.id));
  }

  private reloadTableRows() {
    this.accountHttpService.getTable(this.tableParams).subscribe(result => {
      this.tableData = result;
    });
  }

}
