import {Component, ElementRef, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, NG_VALUE_ACCESSOR, ValidatorFn, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Account} from 'src/app/model/account';
import {AccountHttpService} from 'src/app/services/account.http.service';
import {Path} from 'src/app/app-routing.module';
import {BaseFormComponent} from '../../common/base-form.component';
import {InputFileComponent} from '../../common/form/input-file/input-file.component';
import {CategoryHttpService} from 'src/app/services/category.http.service';
import {Category} from 'src/app/model/category';

@Component({
  selector: 'tm-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent extends BaseFormComponent {

  readonly ID = 'id';
  readonly CODE = 'code';
  readonly NAME = 'name';
  readonly ACTIVE = 'active';
  readonly INCLUDE_IN_SUMMARY = 'includeInSummary';
  readonly BALANCING_CATEGORY = 'balancingCategory';
  readonly COLOR = 'color';
  readonly LIGHT_COLOR = 'lightColor';
  readonly DARK_COLOR = 'darkColor';
  readonly ORDER_NO = 'orderNo';
  readonly ICON = 'icon';
  readonly LOGO = 'logo';

  readonly yesNoOptions = [{label: "Tak", value: true}, {label: "Nie", value: "false"}];

  @ViewChild('logo') logo: InputFileComponent;

  private readonly controlsRequiredForActive = [this.COLOR, this.LIGHT_COLOR, this.DARK_COLOR, this.ORDER_NO, this.ICON, this.LOGO];

  account: Account;
  categories: Category[];

  constructor(el: ElementRef,
              fb: FormBuilder,
              private router: Router,
              route: ActivatedRoute,
              private accountService: AccountHttpService,
              private categoryService: CategoryHttpService) {

    super(el, fb);

    this.buildForm([
      [this.ID],
      [this.CODE, [Validators.required, Validators.maxLength(10), Validators.pattern(/[A-Z_]+/)]],
      [this.NAME, [Validators.required, Validators.maxLength(100)]],
      [this.ACTIVE, true, this.onActiveChange.bind(this)],
      [this.INCLUDE_IN_SUMMARY, true],
      [this.BALANCING_CATEGORY],
      [this.COLOR, Validators.pattern("[A-F0-9]{6}")],
      [this.LIGHT_COLOR, Validators.pattern("[A-F0-9]{6}")],
      [this.DARK_COLOR, Validators.pattern("[A-F0-9]{6}")],
      [this.ORDER_NO, Validators.pattern("[1-9]\.[1-9]")],
      [this.ICON, Validators.maxLength(50)],
      [this.LOGO]
    ]);

    let accountCode = route.snapshot.params['code'];
    if (accountCode) {
      this.accountService.getByCode(accountCode).subscribe(account => {
        this.account = account;
        this.fillForm(account);
      });
    }

    this.categoryService.getByAccountCode(accountCode).subscribe(categories => {
      this.categories = categories;
    });
  }

  onActiveChange(value: boolean): void {
    if (value === true) {
      this.controlsRequiredForActive.forEach(key => {
        this.control(key).addValidators(Validators.required);
        this.control(key).updateValueAndValidity({emitEvent: false});
      });
    }
    else {
      this.controlsRequiredForActive.forEach(key => {
        this.control(key).removeValidators(Validators.required);
        this.control(key).updateValueAndValidity({emitEvent: false});
      });
    }
  }

  onSaveAndGoBack(): void {
    if (this.isValid()) {
      this.accountService.saveOrUpdate(this.readObjectFromForm()).subscribe(account => {
        this.router.navigateByUrl(Path.accounts);
      });
    }
  }

  onCancel() {
    this.router.navigateByUrl(Path.accounts);
  }

  private fillForm(account: Account): void {
    this.formGroup.patchValue({
      [this.ID]: account.id,
      [this.CODE]: account.code,
      [this.NAME]: account.name,
      [this.ACTIVE]: account.active,
      [this.INCLUDE_IN_SUMMARY]: account.includeInSummary,
      [this.BALANCING_CATEGORY]: account.balancingCategory,
      [this.COLOR]: account.color,
      [this.LIGHT_COLOR]: account.lightColor,
      [this.DARK_COLOR]: account.darkColor,
      [this.ORDER_NO]: account.orderNo,
      [this.ICON]: account.icon,
      [this.LOGO]: account.logo
    });
  }

  private readObjectFromForm(): Account {
    const account = new Account();
    account.id = this.controlValue(this.ID);
    account.code = this.controlValue(this.CODE);
    account.name = this.controlValue(this.NAME);
    account.active = this.controlValue(this.ACTIVE);
    account.includeInSummary = this.controlValue(this.INCLUDE_IN_SUMMARY);
    account.balancingCategory = this.controlValue(this.BALANCING_CATEGORY);
    account.color = this.controlValue(this.COLOR);
    account.lightColor = this.controlValue(this.LIGHT_COLOR);
    account.darkColor = this.controlValue(this.DARK_COLOR);
    account.orderNo = this.controlValue(this.ORDER_NO);
    account.icon = this.controlValue(this.ICON);
    account.logo = this.logo.logoBase64;
    console.log(account);
    return account;
  }

}
