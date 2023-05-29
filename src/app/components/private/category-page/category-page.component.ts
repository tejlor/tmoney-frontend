import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Category} from 'src/app/model/category';
import {Account} from 'src/app/model/account';
import {CategoryHttpService} from 'src/app/services/category.http.service';
import {bit, parseAmount} from 'src/app/utils/utils';
import {Path} from 'src/app/app-routing.module';
import {BaseForm} from '../../common/base-form';
import {DEC_FORMAT, TITLE_POSTFIX} from 'src/app/utils/constants';
import {formatNumber} from '@angular/common';
import {AccountService} from 'src/app/services/account.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'tm-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent extends BaseForm {

  readonly NAME = 'name';
  readonly ACCOUNT = 'account';
  readonly REPORT = 'report';
  readonly DEFAULT_AMOUNT = 'defaultAmount';
  readonly DEFAULT_NAME = 'defaultName';
  readonly DEFAULT_DESCRIPTION = 'defaultDescription';

  readonly reportOptions = [{label: "Tak", value: true}, {label: "Nie", value: false}];

  @ViewChildren('accountInput')
  private accountInputs: QueryList<ElementRef<HTMLInputElement>>;

  category: Category;
  accounts: Account[][];


  constructor(el: ElementRef,
              fb: FormBuilder,
              route: ActivatedRoute,
              private router: Router,
              private titleService: Title,
              private accountService: AccountService,
              private categoryHttpService: CategoryHttpService) {

    super(el, fb);

    this.buildForm([
      [this.NAME, [Validators.required, Validators.maxLength(100)]],
      [this.ACCOUNT],
      [this.REPORT, true],
      [this.DEFAULT_AMOUNT],
      [this.DEFAULT_NAME, [Validators.maxLength(100)]],
      [this.DEFAULT_DESCRIPTION, [Validators.maxLength(255)]]
    ]);

    this.accountService.allAccounts$.subscribe(accounts => {
      this.accounts = [];
      for (let account of accounts) {
        let pos = account.orderNo.split('.');
        let row = Number(pos[0]) - 1;
        let col = Number(pos[1]) - 1;
        if (this.accounts[row] === undefined) {
          this.accounts[row] = [];
        }
        this.accounts[row][col] = account;
      }
    });

    let categoryId = route.snapshot.params['id'];
    if (categoryId) {
      this.categoryHttpService.getById(categoryId).subscribe(category => {
        this.category = category;
        this.fillForm(category);
        this.titleService.setTitle(`Kategoria ${category.name} ${TITLE_POSTFIX}`);
      });
    }
    else {
      this.titleService.setTitle(`Nowa kategoria ${TITLE_POSTFIX}`);
    }
  }

  isAccountSelected(account: Account): boolean {
    return (this.category?.account & bit(account.id)) !== 0;
  }

  onSaveAndGoBack(): void {
    if (this.isValid()) {
      this.categoryHttpService.saveOrUpdate(this.readForm()).subscribe(category => {
        this.router.navigateByUrl(Path.categories());
      });
    }
  }

  onCancel() {
    this.router.navigateByUrl(Path.categories());
  }

  private fillForm(category: Category): void {
    this.formGroup.patchValue({
      [this.NAME]: category.name,
      [this.ACCOUNT]: category.account,
      [this.REPORT]: category.report,
      [this.DEFAULT_AMOUNT]: category.defaultAmount !== undefined ? formatNumber(category.defaultAmount, 'pl-PL', DEC_FORMAT) : '',
      [this.DEFAULT_NAME]: category.defaultName,
      [this.DEFAULT_DESCRIPTION]: category.defaultDescription
    });
  }

  private readForm(): Category {
    const category = new Category();
    category.id = this.category?.id;
    category.name = this.controlValue(this.NAME);
    category.account = this.readAccountInputsValue();
    category.report = this.controlValue(this.REPORT);
    category.defaultAmount = parseAmount(this.controlValue(this.DEFAULT_AMOUNT));
    category.defaultName = this.controlValue(this.DEFAULT_NAME);
    category.defaultDescription = this.controlValue(this.DEFAULT_DESCRIPTION);

    if (category.account === 0) {
      category.defaultName = null;
      category.defaultAmount = null;
      category.defaultDescription = null;
    }

    return category;
  }

  private readAccountInputsValue(): number {
    const result = this.accountInputs
      .filter(ref => ref.nativeElement.checked)
      .reduce((result, ref) => {
        const accountId = bit(Number(ref.nativeElement.attributes.getNamedItem('accountId').value));
        return result | accountId;
      }, 0);

    this.setControlValue(this.ACCOUNT, result);
    return result;
  }

}
