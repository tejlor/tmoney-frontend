import {Component, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Path} from 'src/app/app-routing.module';
import {AccountSummary} from 'src/app/model/accountSummary';
import {Category} from 'src/app/model/category';
import {Entry} from 'src/app/model/entry';
import {AccountHttpService} from 'src/app/services/account.http.service';
import {CategoryHttpService} from 'src/app/services/category.http.service';
import {EntryHttpService} from 'src/app/services/entry.http.service';
import {SettingService} from 'src/app/services/setting.service';
import {formatAmount, parseAmount} from 'src/app/utils/utils';
import {BaseForm} from '../../common/base-form';

@Component({
  selector: 'tm-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.scss']
})
export class EntryPageComponent extends BaseForm {

  readonly CATEGORY = 'category';
  readonly DATE = 'date';
  readonly NAME = 'name';
  readonly SIGN = 'sign';
  readonly AMOUNT = 'amount';
  readonly DESCRIPTION = 'description';

  readonly signOptions = [{label: "Przychód", value: 1}, {label: "Koszt", value: -1}];

  entry: Entry;
  categories: Category[];
  summary: AccountSummary;
  formGroup: FormGroup;
  labelStyle: object;
  tags: string[];

  constructor(el: ElementRef,
              fb: FormBuilder,
              route: ActivatedRoute,
              private router: Router,
              private accountHttpService: AccountHttpService,
              private categoryHttpService: CategoryHttpService,
              private entryHttpService: EntryHttpService,
              private settingService: SettingService) {

    super(el, fb);

    this.buildForm([
      [this.CATEGORY, true, this.fillDefaultCategoryValues.bind(this)],
      [this.DATE, true],
      [this.NAME, true],
      [this.SIGN, true],
      [this.AMOUNT, true],
      [this.DESCRIPTION]
    ]);

    let accountCode = route.snapshot.params[Path.params.accountCode];
    let entryId = route.snapshot.params[Path.params.id];

    this.loadSummary(accountCode);

    this.categoryHttpService.getByAccountCode(accountCode).subscribe(categories => {
      this.categories = categories.filter(cat => cat.report === true);
      this.addCurrentCategoryToSelect();
    });

    if (entryId) {
      this.entryHttpService.getById(entryId).subscribe(entry => {
        this.entry = entry;
        this.addCurrentCategoryToSelect();
        this.fillForm(entry);
      });
    }

    this.settingService.settings$.subscribe(settings => {
      this.tags = settings.tags?.split(' ');
    });
  }

  private addCurrentCategoryToSelect(): void {
    if (this.categories && this.entry) {
      if (!this.categories.find(cat => cat.id === this.entry.category.id)) {
        this.categories.splice(0, 0, this.entry.category); // if can't find, add at the beginning
      }
    }
  }

  onTagClick(tag: string): void {
    const textarea = document.getElementsByName(this.DESCRIPTION)[0] as any;
    const startPos = textarea.selectionStart;
    const currentText = this.controlValue(this.DESCRIPTION) ?? '';
    const newText = currentText.substring(0, startPos) + tag + currentText.substring(startPos, currentText.length);
    this.setControlValue(this.DESCRIPTION, newText);
  }

  onSaveAndGoBack(): void {
    if (this.isValid()) {
      this.entryHttpService.saveOrUpdate(this.readForm()).subscribe(entry => {
        this.router.navigateByUrl(Path.entries(this.summary.account.code));
      });
    }
  }

  onSaveAndClear(): void {
    if(this.isValid()) {
      this.entryHttpService.saveOrUpdate(this.readForm()).subscribe(entry => {
        this.fillForm(new Entry());
        this.formGroup.markAsUntouched();
        this.formGroup.updateValueAndValidity();
        this.loadSummary(this.summary.account.code);
      });
    }
  }

  private loadSummary(code: string): void {
    this.accountHttpService.getSummary(code).subscribe(summaries => {
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
        const value = formatAmount(Math.abs(category.defaultAmount));
        this.control(this.AMOUNT).setValue(value);
      }
    }
    if (!this.controlValue(this.DESCRIPTION) && category.defaultDescription) {
      this.control(this.DESCRIPTION).setValue(category.defaultDescription);
    }
  }

  private fillForm(entry: Entry): void {
    this.formGroup.patchValue({
      [this.CATEGORY]: entry.category,
      [this.DATE]: entry.date,
      [this.NAME]: entry.name,
      [this.SIGN]: Math.sign(entry.amount) ?? 1,
      [this.AMOUNT]: entry.amount !== undefined ? formatAmount(Math.abs(entry.amount)) : '',
      [this.DESCRIPTION]: entry.description
    });
  }

  private readForm(): Entry {
    const entry = new Entry();
    entry.account = this.summary.account;
    entry.id = this.entry?.id;
    entry.category = this.controlValue(this.CATEGORY) as Category;
    entry.date = this.controlValue(this.DATE);
    entry.name = this.controlValue(this.NAME);
    entry.amount = parseAmount(this.controlValue(this.AMOUNT)) * this.controlValue(this.SIGN);
    entry.description = this.controlValue(this.DESCRIPTION);
    return entry;
  }
}
