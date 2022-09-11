import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Category} from 'src/app/model/category';
import {Account} from 'src/app/model/account';
import {AccountHttpService} from 'src/app/services/account.http.service';
import {CategoryHttpService} from 'src/app/services/category.http.service';
import {bit} from 'src/app/utils/utils';
import {Path} from 'src/app/app-routing.module';
import {BaseFormComponent} from '../../common/base-form.component';

@Component({
  selector: 'tm-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent extends BaseFormComponent {

  readonly ID = 'id';
  readonly NAME = 'name';
  readonly ACCOUNT = 'account';
  readonly REPORT = 'report';
  readonly DEFAULT_AMOUNT = 'defaultAmount';
  readonly DEFAULT_NAME = 'defaultName';
  readonly DEFAULT_DESCRIPTION = 'defaultDescription';

  readonly reportOptions = [{label: "Tak", value: true}, {label: "Nie", value: "false"}];

  @ViewChildren('accountInput') accountInputs: QueryList<ElementRef<HTMLInputElement>>;

  category: Category;
  accounts: Account[][];

  constructor(el: ElementRef,
              fb: FormBuilder,
              private router: Router,
              route: ActivatedRoute,
              private accountService: AccountHttpService,
              private categoryService: CategoryHttpService) {

    super(el, fb);

    this.buildForm([
      [this.ID],
      [this.NAME, true],
      [this.ACCOUNT],
      [this.REPORT, true],
      [this.DEFAULT_AMOUNT],
      [this.DEFAULT_NAME],
      [this.DEFAULT_DESCRIPTION]
    ]);

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
    if (this.isValid()) {
      this.categoryService.saveOrUpdate(this.readObjectFromForm()).subscribe(category => {
        this.router.navigateByUrl(Path.categories);
      });
    }
  }

  onCancel() {
    this.router.navigateByUrl(Path.categories);
  }

  isAccountSelected(account: Account): boolean {
    return (this.category?.account & bit(account.id)) !== 0;
  }

  private fillForm(category: Category): void {
    this.formGroup.patchValue({
      [this.ID]: category.id,
      [this.NAME]: category.name,
      [this.ACCOUNT]: category.account,
      [this.REPORT]: category.report,
      [this.DEFAULT_AMOUNT]: category.defaultAmount,
      [this.DEFAULT_NAME]: category.defaultName,
      [this.DEFAULT_DESCRIPTION]: category.defaultDescription
    });
  }

  private readObjectFromForm(): Category {
    const category = new Category();
    category.id = this.controlValue(this.ID);
    category.name = this.controlValue(this.NAME);
    category.account = this.readAccountInputsValue();
    category.report = this.controlValue(this.REPORT);
    category.defaultAmount = this.controlValue(this.DEFAULT_AMOUNT);
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

    this.control(this.ACCOUNT).setValue(result);
    return result;
  }

}
