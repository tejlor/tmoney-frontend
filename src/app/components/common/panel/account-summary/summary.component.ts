import {Component, Input} from '@angular/core';
import {Path} from 'src/app/app-routing.module';
import {AccountSummary} from 'src/app/model/accountSummary';
import {DEC_FORMAT} from 'src/app/utils/constants';

@Component({
  selector: 'tm-account-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class AccountSummaryComponent {

  readonly Path = Path;
  readonly DEC_FORMAT = DEC_FORMAT;

  @Input() summary: AccountSummary;
}
