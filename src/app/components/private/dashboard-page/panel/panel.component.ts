import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Path} from 'src/app/app-routing.module';
import {Account} from 'src/app/model/account';
import {Entry} from 'src/app/model/entry';
import {ReportHttpService} from 'src/app/services/report.http.service';
import {DEC_FORMAT} from 'src/app/utils/constants';
import {TransactionsImportDialogComponent} from './import-dialog/import-dialog.component';

@Component({
  selector: 'tm-dashboard-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class DashboardPanelComponent {

  readonly Path = Path;
  readonly DEC_FORMAT = DEC_FORMAT;

  @Input() account: Account;
  @Input() entry: Entry;

  dialogConfig = new TransactionsImportDialogComponent.Config();

  constructor(
    private router: Router,
    private reportHttpService: ReportHttpService) {
  }

  canImportTransactions(): boolean {
    return ['SANTANDER', 'SAN_FIRMA'].includes(this.account?.code);
  }

  onUploadTransactionsClick($event: MouseEvent) {
    $event.stopPropagation();
    this.dialogConfig = new TransactionsImportDialogComponent.Config();
    this.dialogConfig.visible = true;
  }

  processImportedEntries(entries: Entry[]) {
    this.router.navigateByUrl(Path.entry(this.account.code), {state: {entries: entries}});
  }

  onPdfClick() {
    this.reportHttpService.generateTable(this.account.code).subscribe(result => {
      const url= window.URL.createObjectURL(result);
      window.open(url);
    });
  }
}
