import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Path} from 'src/app/app-routing.module';
import {Account} from 'src/app/model/account';
import {Category} from 'src/app/model/category';
import {Entry} from 'src/app/model/entry';
import {AccountHttpService} from 'src/app/services/account.http.service';
import {CategoryHttpService} from 'src/app/services/category.http.service';
import {EntryHttpService} from 'src/app/services/entry.http.service';

@Component({
  selector: 'tm-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.scss']
})
export class EntryPageComponent {

  readonly signOptions = [{label: "Przychód", value: 1}, {label: "Koszt", value: -1}];

  account: Account;
  categories: Category[];
  entry: Entry;
  formGroup: FormGroup;
  labelStyle: object;
  backgroundStyle: object;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountHttpService,
    private categoryService: CategoryHttpService,
    private entryService: EntryHttpService) {

    this.buildForm(fb);

    let accountCode = this.route.snapshot.params['code'];
    let entryId = route.snapshot.params['id'];

    this.categoryService.getByAccountCode(accountCode).subscribe(categories => {
      this.categories = categories;
    });

    this.accountService.getByCode(accountCode).subscribe(account => {
      this.account = account;
      this.labelStyle = {'color': account.darkColor};
      this.backgroundStyle = {'background-color': account.lightColor};
    });

    if (entryId) {
      this.entryService.getById(entryId).subscribe(entry => {
        this.fillForm(entry);
      });
    }
  }

  private buildForm(fb: FormBuilder) {
    this.formGroup = fb.group({
      id: [''],
      name: ['', Validators.required],
      date: ['', Validators.required],
      amount: ['', Validators.required],
      sign: ['', Validators.required],
      category: ['', Validators.required],
      description: ['']
    });

    this.formGroup.controls['category'].valueChanges.subscribe(category => {
      this.fillDefaultCategoryValues(category);
    });
  }

  private fillDefaultCategoryValues(category: Category) {
    if (category.defaultName) {
      this.formGroup.controls['name'].setValue(category.defaultName);
    }
    if (category.defaultAmount) {
      this.formGroup.controls['sign'].setValue(Math.sign(category.defaultAmount));
      if(Math.abs(category.defaultAmount) !== 1) {
        this.formGroup.controls['amount'].setValue(Math.abs(category.defaultAmount));
      }
    }
    if (category.defaultDescription) {
      this.formGroup.controls['description'].setValue(category.defaultDescription);
    }
  }

  saveAndGoBack(): void {
    if(this.isValid()) {
      this.entryService.saveOrUpdate(this.readDataFromForm()).subscribe(entry => {
        this.router.navigateByUrl(Path.entries(this.account.code));
      });
    }
  }

  saveAndClear(): void {
    if(this.isValid()) {
      this.entryService.saveOrUpdate(this.readDataFromForm()).subscribe(entry => {
        this.fillForm(new Entry());
        this.formGroup.markAsUntouched();
        this.formGroup.updateValueAndValidity();
      });
    }
  }

  private isValid(): boolean {
    this.formGroup.markAllAsTouched();
    return this.formGroup.valid;
  }

  private fillForm(entry: Entry): void {
    this.formGroup.patchValue({
      id: entry.id,
      name: entry.name,
      date: entry.date,
      amount: entry.amount,
      category: entry.category,
      description: entry.description
    });
  }

  private readDataFromForm(): Entry {
    const entry = new Entry();
    entry.account = this.account;
    entry.id = this.formGroup.controls['id'].value;
    entry.name = this.formGroup.controls['name'].value;
    entry.date = this.formGroup.controls['date'].value;
    entry.amount = Number((this.formGroup.controls['amount'].value as string).replace(',', '.'));
    entry.category = this.formGroup.controls['category'].value as Category;
    entry.description = this.formGroup.controls['description'].value;
    return entry;
  }
}
