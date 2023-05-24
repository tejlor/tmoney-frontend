import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Entry} from 'src/app/model/entry';
import {Account} from 'src/app/model/account';
import {AccountHttpService} from 'src/app/services/account.http.service';
import {EntryHttpService} from 'src/app/services/entry.http.service';
import {TableData} from 'src/app/model/tableData';
import {TableParams} from 'src/app/model/tableParams';
import {DialogConfig} from '../../common/dialog/dialog.component';
import {Path} from 'src/app/app-routing.module';
import {DEC_FORMAT} from 'src/app/utils/constants';

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
  tableParams: TableParams;
  dialogConfig = new DialogConfig();

  private accountCode: string;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private accountHttpService: AccountHttpService,
              private entryHttpService: EntryHttpService) {
  }

  ngOnInit(): void {
    this.accountCode = this.route.snapshot.params[Path.params.accountCode];
    if (this.accountCode) {
      this.accountHttpService.getByCode(this.accountCode).subscribe(result => {
        this.account = result;
      });
    }
    else {
      this.account = Account.summary();
    }

    this.tableParams = new TableParams();
    this.tableParams.pageNo = Number(this.queryParam('pageNo') ?? 0); // if param is empty, Number return NaN and ?? doesn't work
    this.tableParams.pageSize = Number(this.queryParam('pageSize') ?? 20);
    this.tableParams.sortBy = 'date DESC, id DESC';
    this.tableParams.filter = this.queryParam('filterText') ?? '';

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

  onRowClick(entry: Entry) {
    this.router.navigateByUrl(Path.entry(entry.account.code, entry.id));
  }

  onRemoveEntryClick($event: MouseEvent, entry:Entry): void {
    $event.stopPropagation();
    this.dialogConfig = DialogConfig.confirmation('Uwaga', `Czy na pewno chcesz usunąć wpis "${entry.name}"?`,
      () => {
        this.entryHttpService.remove(entry.id).subscribe(() => {
          this.reloadTableRows();
        });
      });
  }

  private reloadTableRows() {
    this.entryHttpService.getTableByAccountCode(this.accountCode, this.tableParams).subscribe(result => {
      this.tableData = result;
    });
  }

  private queryParam(name: string) {
    return this.route.snapshot.queryParams[name];
  }

  private addParamToUrlQuery(param: any) {
    this.router.navigate([], {
      queryParams: param,
      queryParamsHandling: 'merge'
    });
  }
}
