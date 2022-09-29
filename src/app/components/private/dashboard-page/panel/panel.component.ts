import {Component, Input} from '@angular/core';
import {Path} from 'src/app/app-routing.module';
import {Account} from 'src/app/model/account';
import {Entry} from 'src/app/model/entry';
import {ReportHttpService} from 'src/app/services/report.http.service';

@Component({
  selector: 'tm-dashboard-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class DashboardPanelComponent {

  readonly Path = Path;

  @Input() account: Account;
  @Input() entry: Entry;

  constructor(
    private reportHttpService: ReportHttpService) {
  }

  onPdfClick() {
    this.reportHttpService.generateTable(this.account.code).subscribe(result => {
      const url= window.URL.createObjectURL(result);
      window.open(url);
    });
  }
}
