import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entry } from 'src/app/model/entry';
import { Account } from 'src/app/model/account';
import { AccountHttpService } from 'src/app/services/account.http.service';
import { EntryHttpService } from 'src/app/services/entry.http.service';
import { TableData } from 'src/app/model/tableData';
import { TableParams } from 'src/app/model/tableParams';
import {DialogMode} from 'src/app/enums/dialog-mode';
import {DialogConfig} from '../common/dialog/dialog.component';

@Component({
  selector: 'tm-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements OnInit {

  account: Account;
  tableData: TableData<Entry>;

  dialogConfig = new DialogConfig();

  private accountCode: string;
  private tableParams: TableParams;

  constructor(
    private router: Router,
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
    this.tableParams.sortBy = 'date DESC, id DESC';
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

  onRowClick(entry: Entry) {
    this.router.navigateByUrl(`/entry/${this.accountCode}/${entry.id}`);
  }

  onRemoveEntryClick(entry:Entry): void {
    this.dialogConfig = DialogConfig.confirmation('Uwaga', `Czy na pewno chcesz usunąć wpis ${entry.name}?`,
      () => {
        console.log('delete ' + entry.id);
      });
  }

  private reloadTableRows() {
    this.entryService.getTableByAccountCode(this.accountCode, this.tableParams).subscribe(result => {
      this.tableData = result;
    });
  }

}
