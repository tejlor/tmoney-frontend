import {formatNumber} from '@angular/common';
import {Component, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Path} from 'src/app/app-routing.module';
import {AccountSummary} from 'src/app/model/accountSummary';
import {Category} from 'src/app/model/category';
import {Entry} from 'src/app/model/entry';
import {AccountHttpService} from 'src/app/services/account.http.service';
import {CategoryHttpService} from 'src/app/services/category.http.service';
import {EntryHttpService} from 'src/app/services/entry.http.service';
import {SettingService} from 'src/app/services/setting.service';
import {DEC_FORMAT} from 'src/app/utils/constants';
import {stringToNumber} from 'src/app/utils/utils';
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

  categories: Category[];
  entry: Entry;
  summary: AccountSummary;
  formGroup: FormGroup;
  labelStyle: object;
  tags: string[];

  constructor(el: ElementRef,
              fb: FormBuilder,
              route: ActivatedRoute,
              private router: Router,
              private accountService: AccountHttpService,
              private categoryService: CategoryHttpService,
              private entryService: EntryHttpService,
              private settingService: SettingService) {

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

    this.loadSummary(accountCode);

    this.categoryService.getByAccountCode(accountCode).subscribe(categories => {
      this.categories = categories;
    });

    if (entryId) {
      this.entryService.getById(entryId).subscribe(entry => {
        this.fillForm(entry);
      });
    }

    this.settingService.settings.subscribe(settings => {
      this.tags = settings.tags?.split(' ');
    });
  }

  onTagClick(tag: string): void {
    const textarea = document.getElementsByName(this.DESCRIPTION)[0] as any;
    const startPos = textarea.selectionStart;
    const currentText = this.controlValue(this.DESCRIPTION);
    const newText = currentText.substring(0, startPos) + tag + currentText.substring(startPos, currentText.length);
    this.control(this.DESCRIPTION).setValue(newText);
  }

  saveAndGoBack(): void {
    if (this.isValid()) {
      this.entryService.saveOrUpdate(this.readObjectFromForm()).subscribe(entry => {
        this.router.navigateByUrl(Path.entries(this.summary.account.code));
      });
    }
  }

  saveAndClear(): void {
    if(this.isValid()) {
      this.entryService.saveOrUpdate(this.readObjectFromForm()).subscribe(entry => {
        this.fillForm(new Entry());
        this.formGroup.markAsUntouched();
        this.formGroup.updateValueAndValidity();
        this.loadSummary(this.summary.account.code);
      });
    }
  }

  private loadSummary(code: string): void {
    this.accountService.getSummary(code).subscribe(summaries => {
      this.summary = summaries[0];
      this.labelStyle = {'color': '#' + this.summary.account.darkColor};
    });
  }

  private fillDefaultCategoryValues(category: Category) {
    if (!this.controlValue(this.NAME) && category.defaultName) {
      this.control(this.NAME).setValue(category.defaultName);
    }
    if (!this.controlValue(this.AMOUNT) && category.defaultAmount) {
      this.control(this.SIGN).setValue(Math.sign(category.defaultAmount));
      if (Math.abs(category.defaultAmount) !== 1) {
        const value = this.formatValueAsAmount(Math.abs(category.defaultAmount));
        this.control(this.AMOUNT).setValue(value);
      }
    }
    if (!this.controlValue(this.DESCRIPTION) && category.defaultDescription) {
      this.control(this.DESCRIPTION).setValue(category.defaultDescription);
    }
  }

  private formatValueAsAmount(value: number): string {
    return formatNumber(value, 'pl-PL', DEC_FORMAT);
  }

  private fillForm(entry: Entry): void {
    this.formGroup.patchValue({
      [this.ID]: entry.id,
      [this.CATEGORY]: entry.category,
      [this.DATE]: entry.date,
      [this.NAME]: entry.name,
      [this.SIGN]: Math.sign(entry.amount) ?? 1,
      [this.AMOUNT]: entry.amount !== undefined ? formatNumber(Math.abs(entry.amount), 'pl-PL', DEC_FORMAT) : '',
      [this.DESCRIPTION]: entry.description
    });
  }

  private readObjectFromForm(): Entry {
    const entry = new Entry();
    entry.account = this.summary.account;
    entry.id = this.controlValue(this.ID);
    entry.category = this.controlValue(this.CATEGORY) as Category;
    entry.date = this.controlValue(this.DATE);
    entry.name = this.controlValue(this.NAME);
    entry.amount = stringToNumber(this.controlValue(this.AMOUNT)) * this.controlValue(this.SIGN);
    entry.description = this.controlValue(this.DESCRIPTION);
    entry.balance = 0;
    entry.balanceOverall = 0;
    return entry;
  }
}
