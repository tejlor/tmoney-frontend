import {Component, Input} from '@angular/core';
import {Path} from 'src/app/app-routing.module';
import {AccountSummary} from 'src/app/model/accountSummary';

@Component({
  selector: 'tm-account-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class AccountSummaryComponent {

  readonly Path = Path;

  @Input() summary: AccountSummary;
}
