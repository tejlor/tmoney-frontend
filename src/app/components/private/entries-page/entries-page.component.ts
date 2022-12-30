import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entry } from 'src/app/model/entry';
import { Account } from 'src/app/model/account';
import { AccountHttpService } from 'src/app/services/account.http.service';
import { EntryHttpService } from 'src/app/services/entry.http.service';
import { TableData } from 'src/app/model/tableData';
import { TableParams } from 'src/app/model/tableParams';
import {DialogConfig} from '../../common/dialog/dialog.component';
import {Path} from 'src/app/app-routing.module';
import {DEC_FORMAT} from 'src/app/utils/constants';
import {filter} from 'rxjs';

@Component({
  selector: 'tm-entries-page',
  templateUrl: './entries-page.component.html',
  styleUrls: ['./entries-page.component.scss']
})
export class EntriesPageComponent implements OnInit {

  readonly Path = Path;
  readonly DEC_FORMAT = DEC_FORMAT;

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
    if (this.accountCode) {
      this.accountService.getByCode(this.accountCode).subscribe(result => {
        this.account = result;
      });
    }
    else {
      this.account = Account.summary();
    }

    this.tableParams = new TableParams();
    this.tableParams.pageNo = this.queryParam('pageNo') ?? 0;
    this.tableParams.pageSize = this.queryParam('pageSize') ?? 10;
    this.tableParams.sortBy = 'date DESC, id DESC';
    this.tableParams.filter = this.queryParam('filterText') ?? '';

    this.reloadTableRows();
  }

  search(filterText: any) {
    if (typeof(filterText) !== 'string') {
      return;
    }
    this.tableParams.filter = filterText as string;
    this.router.navigate([], {
      queryParams: {filterText},
      queryParamsHandling: 'merge'
    });
    this.reloadTableRows();
  }

  onPageSizeChange(pageSize: number): void {
    this.tableParams.pageSize = pageSize;
    this.router.navigate([], {
      queryParams: {pageSize},
      queryParamsHandling: 'merge'
    });
    this.reloadTableRows();
  }

  onPageChange(pageNo: number): void {
    this.tableParams.pageNo = pageNo;
    this.router.navigate([], {
      queryParams: {pageNo},
      queryParamsHandling: 'merge'
    });
    this.reloadTableRows();
  }

  onRowClick(entry: Entry) {
    this.router.navigateByUrl(Path.entry(entry.account.code, entry.id));
  }

  onRemoveEntryClick($event: MouseEvent, entry:Entry): void {
    $event.stopPropagation();
    this.dialogConfig = DialogConfig.confirmation('Uwaga', `Czy na pewno chcesz usunąć wpis ${entry.name}?`,
      () => {
        this.entryService.remove(entry.id).subscribe(() => {
          this.reloadTableRows();
        });
      });
  }

  private reloadTableRows() {
    this.entryService.getTableByAccountCode(this.accountCode, this.tableParams).subscribe(result => {
      this.tableData = result;
    });
  }

  private queryParam(name: string) {
    return this.route.snapshot.queryParams[name];
  }

}