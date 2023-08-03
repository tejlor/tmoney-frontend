import {Component, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {Path} from 'src/app/app-routing.module';
import {AccountSummary} from 'src/app/model/accountSummary';
import {Category} from 'src/app/model/category';
import {Entry} from 'src/app/model/entry';
import {AccountHttpService} from 'src/app/services/account.http.service';
import {CategoryHttpService} from 'src/app/services/category.http.service';
import {EntryHttpService} from 'src/app/services/entry.http.service';
import {DATE_PATTERN, TITLE_POSTFIX} from 'src/app/utils/constants';
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
  stateEntries: Entry[];
  stateIndex: number;
  categories: Category[];
  summary: AccountSummary;
  formGroup: FormGroup;
  labelStyle: object;


  constructor(el: ElementRef,
              fb: FormBuilder,
              route: ActivatedRoute,
              private router: Router,
              private titleService: Title,
              private accountHttpService: AccountHttpService,
              private categoryHttpService: CategoryHttpService,
              private entryHttpService: EntryHttpService) {

    super(el, fb);

    this.buildForm([
      [this.CATEGORY, true, this.fillDefaultCategoryValues.bind(this)],
      [this.DATE, [Validators.required, Validators.pattern(DATE_PATTERN)]],
      [this.NAME, [Validators.required, Validators.maxLength(100)]],
      [this.SIGN, true],
      [this.AMOUNT, [Validators.required, Validators.min(0)]],
      [this.DESCRIPTION, [Validators.maxLength(255)]]
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
        this.titleService.setTitle(`Wpis ${entry.name} ${TITLE_POSTFIX}`);
      });
    }
    else {
      const state = this.router.getCurrentNavigation().extras?.state;
      if (state && state['entries']) {
        this.stateIndex = 0;
        this.stateEntries = state['entries'];
        this.entry = this.stateEntries[this.stateIndex];
        this.fillForm(this.entry);
        if (this.entry.category) {
          this.fillDefaultCategoryValues(this.entry.category);
        }
      }
      this.titleService.setTitle(`Nowy wpis ${TITLE_POSTFIX}`);
    }
  }

  private addCurrentCategoryToSelect(): void {
    if (this.categories && this.entry) {
      if (!this.categories.find(cat => cat.id === this.entry.category.id)) {
        this.categories.splice(0, 0, this.entry.category); // if can't find, add at the beginning
      }
    }
  }

  onSaveAndGoBack(): void {
    if (this.isValid()) {
      this.entryHttpService.saveOrUpdate(this.readForm()).subscribe(entry => {
        this.router.navigateByUrl(Path.entries(this.summary.account.code));
      });
    }
  }

  onSaveAndClear(): void {
    if (this.isValid()) {
      this.entryHttpService.saveOrUpdate(this.readForm()).subscribe(entry => {
       this.loadNextEntry();
      });
    }
  }

  onSkip() {
    this.loadNextEntry();
  }

  private loadNextEntry() {
    let newEntry: Entry;
    if (this.stateEntries && ++this.stateIndex < this.stateEntries.length) {
      newEntry = this.stateEntries[this.stateIndex];
    }
    else {
      newEntry = new Entry();
    }
    this.fillForm(newEntry);
    this.formGroup.markAsUntouched();
    this.formGroup.updateValueAndValidity();
    this.loadSummary(this.summary.account.code);
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
    entry.id = this.entry?.id;
    entry.externalId = this.entry?.externalId;
    entry.account = this.summary.account;
    entry.category = this.controlValue(this.CATEGORY) as Category;
    entry.date = this.controlValue(this.DATE);
    entry.name = this.controlValue(this.NAME);
    entry.amount = parseAmount(this.controlValue(this.AMOUNT)) * this.controlValue(this.SIGN);
    entry.description = this.controlValue(this.DESCRIPTION);
    return entry;
  }
}
