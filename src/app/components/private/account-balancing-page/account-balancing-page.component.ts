import {Component, ElementRef} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Account} from 'src/app/model/account';
import {AccountHttpService} from 'src/app/services/account.http.service';
import {Path} from 'src/app/app-routing.module';
import {BaseFormComponent} from '../../common/base-form.component';
import {BalanceRequest} from 'src/app/model/balanceRequest';
import {AccountSummary} from 'src/app/model/accountSummary';
import {stringToNumber} from 'src/app/utils/utils';

@Component({
  selector: 'tm-account-balancing-page',
  templateUrl: './account-balancing-page.component.html',
  styleUrls: ['./account-balancing-page.component.scss']
})
export class AccountBalancingPageComponent extends BaseFormComponent {

  readonly DATE = 'date';
  readonly BALANCE = 'balance';

  account: Account;
  summary: AccountSummary;


  constructor(el: ElementRef,
              fb: FormBuilder,
              private router: Router,
              route: ActivatedRoute,
              private accountService: AccountHttpService) {

    super(el, fb);

    this.buildForm([
      [this.DATE, true],
      [this.BALANCE, true]
    ]);

    let accountCode = route.snapshot.params['code'];
    if (accountCode) {
      this.accountService.getByCode(accountCode).subscribe(account => {
        this.account = account;
      });
    }

    this.accountService.getSummary(accountCode).subscribe(summaries => {
      this.summary = summaries[0];
    });
  }

  onSaveAndGoBack(): void {
    if (this.isValid()) {
      this.accountService.balance(this.readObjectFromForm()).subscribe(() => {
        this.router.navigateByUrl(Path.dashboard);
      });
    }
  }

  onCancel() {
    this.router.navigateByUrl(Path.dashboard);
  }

  private readObjectFromForm(): BalanceRequest {
    const request = new BalanceRequest();
    request.accountId = this.account.id;
    request.date = this.controlValue(this.DATE);
    request.balance = stringToNumber(this.controlValue(this.BALANCE));
    return request;
  }

}
