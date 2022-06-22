import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Category} from 'src/app/model/category';
import {Account} from 'src/app/model/account';
import {AccountHttpService} from 'src/app/services/account.http.service';
import {CategoryHttpService} from 'src/app/services/category.http.service';

@Component({
  selector: 'tm-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent {

  @ViewChildren('accountInput') accountInputs: QueryList<ElementRef<HTMLInputElement>>;

  category: Category;
  accounts: Account[][];
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    route: ActivatedRoute,
    private accountService: AccountHttpService,
    private categoryService: CategoryHttpService) {

    this.formGroup = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      account: [''],
      report: ['', Validators.required],
      defaultAmount: [''],
      defaultName: [''],
      defaultDescription: ['']
    });

    this.accountService.getActive().subscribe(accounts => {
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
      this.categoryService.getById(categoryId).subscribe(category => {
        this.category = category;
        this.fillForm(category);
      });
    }
  }

  onSaveAndGoBack(): void {
    if(this.isValid()) {
      this.categoryService.saveOrUpdate(this.readDataFromForm()).subscribe(category => {
        this.router.navigateByUrl('/categories');
      });
    }
  }

  onCancel() {
    this.router.navigateByUrl('/categories');
  }

  isAccountSelected(account: Account): boolean {
    console.log(this.category?.account, account.id, this.category?.account & this.bit(account.id));
    return (this.category?.account & this.bit(account.id)) !== 0;
  }

  private readAccountInputsValue(): number {
    const result = this.accountInputs
      .filter(ref => ref.nativeElement.checked)
      .reduce((result, ref) => {
        const accountId = Number(ref.nativeElement.attributes.getNamedItem('accountId').value);
        return result | accountId;
      }, 0);

    this.formGroup.controls['account'].setValue(result);
    return result;
  }

  private isValid(): boolean {
    this.formGroup.markAllAsTouched();
    return this.formGroup.valid;
  }

  private fillForm(category: Category): void {
    this.formGroup.patchValue({
      id: category.id,
      name: category.name,
      account: category.account,
      report: category.report,
      defaultAmount: category.defaultAmount,
      defaultName: category.defaultName,
      defaultDescription: category.defaultDescription
    });
  }

  private readDataFromForm(): Category {
    const category = new Category();
    category.id = this.formGroup.controls['id'].value;
    category.name = this.formGroup.controls['name'].value;
    category.account = this.readAccountInputsValue();
    category.report = this.formGroup.controls['report'].value;
    category.defaultAmount = this.formGroup.controls['defaultAmount'].value;
    category.defaultName = this.formGroup.controls['defaultName'].value;
    category.defaultDescription = this.formGroup.controls['defaultDescription'].value;
    return category;
  }

  private bit(accountId: number) {
    return 1 << accountId;
  }

}
