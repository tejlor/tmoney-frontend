import {Component, Input} from '@angular/core';
import {Path} from 'src/app/app-routing.module';
import {Entry} from 'src/app/model/entry';

@Component({
  selector: 'tm-dashboard-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class DashboardSummaryComponent {

  readonly Path = Path;

  @Input() entry: Entry;
}
