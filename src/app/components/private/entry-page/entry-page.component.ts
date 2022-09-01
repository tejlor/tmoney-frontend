import {formatNumber} from '@angular/common';
import {Component, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Path} from 'src/app/app-routing.module';
import {Account} from 'src/app/model/account';
import {Category} from 'src/app/model/category';
import {Entry} from 'src/app/model/entry';
import {AccountHttpService} from 'src/app/services/account.http.service';
import {CategoryHttpService} from 'src/app/services/category.http.service';
import {EntryHttpService} from 'src/app/services/entry.http.service';
import {BaseFormComponent} from '../../common/base-form.component';

@Component({
  selector: 'tm-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.scss']
})
export class EntryPageComponent extends BaseFormComponent {

  readonly ID = 'id';
  readonly CATEGORY = 'category';
  readonly DATE = 'date';
  readonly NAME = 'name';
  readonly SIGN = 'sign';
  readonly AMOUNT = 'amount';
  readonly DESCRIPTION = 'description';

  readonly signOptions = [{label: "Przychód", value: 1}, {label: "Koszt", value: -1}];

  account: Account;
  categories: Category[];
  entry: Entry;
  formGroup: FormGroup;
  labelStyle: object;

  constructor(el: ElementRef,
              fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private accountService: AccountHttpService,
              private categoryService: CategoryHttpService,
              private entryService: EntryHttpService) {

    super(el, fb);

    this.buildForm([
      [this.ID],
      [this.CATEGORY, true, this.fillDefaultCategoryValues.bind(this)],
      [this.DATE, true],
      [this.NAME, true],
      [this.SIGN, true],
      [this.AMOUNT, true],
      [this.DESCRIPTION]
    ]);

    let accountCode = route.snapshot.params['code'];
    let entryId = route.snapshot.params['id'];

    this.categoryService.getByAccountCode(accountCode).subscribe(categories => {
      this.categories = categories;
    });

    this.accountService.getByCode(accountCode).subscribe(account => {
      this.account = account;
      this.labelStyle = {'color': account.darkColor};
    });

    if (entryId) {
      this.entryService.getById(entryId).subscribe(entry => {
        this.fillForm(entry);
      });
    }
  }

  saveAndGoBack(): void {
    if (this.isValid()) {
      this.entryService.saveOrUpdate(this.readObjectFromForm()).subscribe(entry => {
        this.router.navigateByUrl(Path.entries(this.account.code));
      });
    }
  }

  saveAndClear(): void {
    if(this.isValid()) {
      this.entryService.saveOrUpdate(this.readObjectFromForm()).subscribe(entry => {
        this.fillForm(new Entry());
        this.formGroup.markAsUntouched();
        this.formGroup.updateValueAndValidity();
      });
    }
  }

  private fillDefaultCategoryValues(category: Category) {
    if (!this.controlValue(this.NAME)) {
      this.control(this.NAME).setValue(category.defaultName);
    }
    if (!this.controlValue(this.AMOUNT)) {
      this.control(this.SIGN).setValue(Math.sign(category.defaultAmount));
      if (Math.abs(category.defaultAmount) !== 1) {
        this.control(this.AMOUNT).setValue(Math.abs(category.defaultAmount));
      }
    }
    if (!this.controlValue(this.DESCRIPTION)) {
      this.control(this.DESCRIPTION).setValue(category.defaultDescription);
    }
  }

  private fillForm(entry: Entry): void {
    this.formGroup.patchValue({
      id: entry.id,
      category: entry.category,
      date: entry.date,
      name: entry.name,
      sign: Math.sign(entry.amount) ?? 1,
      amount: entry.amount !== undefined ? formatNumber(Math.abs(entry.amount), 'pl-PL', '1.2-2') : '',
      description: entry.description
    });
  }

  private readObjectFromForm(): Entry {
    const entry = new Entry();
    entry.account = this.account;
    entry.id = this.controlValue(this.ID);
    entry.category = this.controlValue(this.CATEGORY) as Category;
    entry.date = this.controlValue(this.DATE);
    entry.name = this.controlValue(this.DATE);
    entry.amount = Number((this.controlValue(this.AMOUNT) as string).replace(',', '.')) * this.controlValue(this.SIGN);
    entry.description = this.controlValue(this.DESCRIPTION);
    return entry;
  }
}
