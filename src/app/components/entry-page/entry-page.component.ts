import {NgStyle} from '@angular/common';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
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

  account: Account;
  categories: Category[];
  entry: Entry;
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountHttpService,
    private categoryService: CategoryHttpService,
    private entryService: EntryHttpService) {

    this.formGroup = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      date: ['', Validators.required],
      amount: ['', Validators.required],
      category: ['', Validators.required],
      description: ['']
    });

    let accountCode = this.route.snapshot.params['code'];
    this.accountService.getByCode(accountCode).subscribe(account => {
      this.account = account;
    });

    let entryId = route.snapshot.params['id'];
    if (entryId) {
      this.entryService.getById(entryId).subscribe(entry => {
        this.fillForm(entry);
      });
    }

    this.categoryService.getByAccountCode(accountCode).subscribe(categories => {
      this.categories = categories;
    });
  }

  saveAndGoBack(): void {
    if(this.isValid()) {
      this.entryService.saveOrUpdate(this.readDataFromForm()).subscribe(entry => {
        this.router.navigateByUrl('/dashboard');
      });
    }
  }

  saveAndClear(): void {
    if(this.isValid()) {
      this.entryService.saveOrUpdate(this.readDataFromForm()).subscribe(entry => {
        this.fillForm(new Entry());
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
      category: entry.category.id,
      description: entry.description
    });
  }

  private readDataFromForm(): Entry {
    const entry = new Entry();
    entry.account = this.account;
    entry.id = this.formGroup.controls['id'].value;
    entry.name = this.formGroup.controls['name'].value;
    entry.date = this.formGroup.controls['date'].value;
    entry.amount = this.formGroup.controls['amount'].value;
    entry.category.id = this.formGroup.controls['category'].value;
    entry.description = this.formGroup.controls['description'].value;
    return entry;
  }
}
