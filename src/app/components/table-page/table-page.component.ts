import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entry } from 'src/app/model/entry';
import { Account } from 'src/app/model/account';
import { AccountHttpService } from 'src/app/services/account.http.service';
import { EntryHttpService } from 'src/app/services/entry.http.service';
import { TableData } from 'src/app/model/tableData';
import { TableParams } from 'src/app/model/tableParams';

@Component({
  selector: 'tm-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements OnInit {

  account: Account;
  tableData: TableData<Entry>;

  private accountCode: string;
  private tableParams: TableParams;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountHttpService,
    private entryService: EntryHttpService) {

  }

  ngOnInit(): void {
    this.accountCode = this.route.snapshot.params['code'];
    this.accountService.getByCode(this.accountCode).subscribe(result => {
      this.account = result;
    });

    this.tableParams = new TableParams();
    this.tableParams.pageNo = 0;
    this.tableParams.pageSize = 10;
    this.tableParams.sortBy = 'date';
    this.tableParams.sortAsc = false;
    this.tableParams.filter = '';

    this.reloadTableRows();
  }

  private reloadTableRows() {
    this.entryService.getByCode(this.accountCode, this.tableParams).subscribe(result => {
      this.tableData = result;
    });
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

}
