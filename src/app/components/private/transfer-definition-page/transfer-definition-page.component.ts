import {Component, ElementRef} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Path} from 'src/app/app-routing.module';
import {BaseFormComponent} from '../../common/base-form.component';
import {CategoryHttpService} from 'src/app/services/category.http.service';
import {Category} from 'src/app/model/category';
import {Account} from 'src/app/model/account';
import {TransferDefinition} from 'src/app/model/transferDefinition';
import {TransferHttpService} from 'src/app/services/transfer.http.service';
import {AccountHttpService} from 'src/app/services/account.http.service';
import {SettingService} from 'src/app/services/setting.service';

@Component({
  selector: 'tm-transfer-definition-page',
  templateUrl: './transfer-definition-page.component.html',
  styleUrls: ['./transfer-definition-page.component.scss']
})
export class TransferDefinitionPageComponent extends BaseFormComponent {

  readonly SOURCE_ACCOUNT = 'sourceAccount';
  readonly DESTINATION_ACCOUNT = 'destinationAccount';
  readonly CATEGORY = 'category';
  readonly NAME = 'name';
  readonly DESCRIPTION = 'description';

  readonly yesNoOptions = [{label: "Tak", value: true}, {label: "Nie", value: "false"}];

  definition: TransferDefinition;
  accounts: Account[];
  categories: Category[];
  tags: string[];


  constructor(el: ElementRef,
              fb: FormBuilder,
              private router: Router,
              route: ActivatedRoute,
              private transferService: TransferHttpService,
              private accountService: AccountHttpService,
              private categoryService: CategoryHttpService,
              private settingService: SettingService) {

    super(el, fb);

    this.buildForm([
      [this.SOURCE_ACCOUNT, true],
      [this.DESTINATION_ACCOUNT, true],
      [this.CATEGORY, true],
      [this.NAME, [Validators.required, Validators.maxLength(100)]],
      [this.DESCRIPTION, Validators.maxLength(255)]
    ]);

    let definitionId = route.snapshot.params['id'];
    if (definitionId) {
      this.transferService.getById(definitionId).subscribe(definition => {
        this.definition = definition;
        this.fillForm(definition);
      });
    }

    this.accountService.getAll(true).subscribe(accounts => {
      this.accounts = accounts;
    });

    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });

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

  onSaveAndGoBack(): void {
    if (this.isValid()) {
      this.transferService.saveOrUpdate(this.readObjectFromForm()).subscribe(account => {
        this.router.navigateByUrl(Path.transferDefinitions);
      });
    }
  }

  onCancel() {
    this.router.navigateByUrl(Path.transferDefinitions);
  }

  private fillForm(definition: TransferDefinition): void {
    this.formGroup.patchValue({
      [this.SOURCE_ACCOUNT]: definition.sourceAccount,
      [this.DESTINATION_ACCOUNT]: definition.destinationAccount,
      [this.CATEGORY]: definition.category,
      [this.NAME]: definition.name,
      [this.DESCRIPTION]: definition.description
    });
  }

  private readObjectFromForm(): TransferDefinition {
    const definition = new TransferDefinition();
    definition.id = this.definition?.id;
    definition.sourceAccount = this.controlValue(this.SOURCE_ACCOUNT);
    definition.destinationAccount = this.controlValue(this.DESTINATION_ACCOUNT);
    definition.category = this.controlValue(this.CATEGORY);
    definition.name = this.controlValue(this.NAME);
    definition.description = this.controlValue(this.DESCRIPTION);
    return definition;
  }

}
