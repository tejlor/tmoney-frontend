import {Component, Input} from '@angular/core';
import {Account} from 'src/app/model/account';

@Component({
  selector: 'tm-account-colors',
  templateUrl: './account-colors.component.html',
  styleUrls: ['./account-colors.component.scss']
})
export class AccountColorsComponent {

  @Input() account: Account;

}
