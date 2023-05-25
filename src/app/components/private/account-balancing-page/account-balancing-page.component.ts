import {Component, ElementRef} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Account} from 'src/app/model/account';
import {AccountHttpService} from 'src/app/services/account.http.service';
import {Path} from 'src/app/app-routing.module';
import {BaseForm} from '../../common/base-form';
import {BalanceRequest} from 'src/app/model/balanceRequest';
import {AccountSummary} from 'src/app/model/accountSummary';
import {parseAmount} from 'src/app/utils/utils';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'tm-account-balancing-page',
  templateUrl: './account-balancing-page.component.html',
  styleUrls: ['./account-balancing-page.component.scss']
})
export class AccountBalancingPageComponent extends BaseForm {

  readonly DATE = 'date';
  readonly BALANCE = 'balance';

  account: Account;
  summary: AccountSummary;


  constructor(el: ElementRef,
              fb: FormBuilder,
              route: ActivatedRoute,
              private router: Router,
              private accountHttpService: AccountHttpService) {

    super(el, fb);

    this.buildForm([
      [this.DATE, true],
      [this.BALANCE, true]
    ]);

    let accountCode = route.snapshot.params[Path.params.code];
    if (accountCode) {
      this.accountHttpService.getByCode(accountCode).subscribe(account => {
        this.account = account;
      });
    }

    this.accountHttpService.getSummary(accountCode).subscribe(summaries => {
      this.summary = summaries[0];
    });
  }

  onSaveAndGoBack(): void {
    if (this.isValid()) {
      this.accountHttpService.balance(this.readForm()).subscribe(() => {
        this.router.navigateByUrl(Path.dashboard());
      });
    }
  }

  onCancel() {
    this.router.navigateByUrl(Path.dashboard());
  }

  private readForm(): BalanceRequest {
    const request = new BalanceRequest();
    request.accountId = this.account.id;
    request.date = this.controlValue(this.DATE);
    request.balance = parseAmount(this.controlValue(this.BALANCE));
    return request;
  }

}
