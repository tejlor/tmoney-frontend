import {Component, Input} from '@angular/core';
import * as moment from 'moment';
import {Path} from 'src/app/app-routing.module';
import {Account} from 'src/app/model/account';
import {Entry} from 'src/app/model/entry';

@Component({
  selector: 'tm-dashboard-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class DashboardPanelComponent {

  readonly Path = Path;

  @Input() account: Account;
  @Input() entry: Entry;

  date(): string {
    return moment(this.entry.date).format('D MMM');
  }
}
