import {Component, ElementRef} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Path} from 'src/app/app-routing.module';
import {BaseForm} from '../../common/base-form';
import {CategoryHttpService} from 'src/app/services/category.http.service';
import {Category} from 'src/app/model/category';
import {Account} from 'src/app/model/account';
import {TransferDefinition} from 'src/app/model/transferDefinition';
import {TransferHttpService} from 'src/app/services/transfer.http.service';
import {SettingService} from 'src/app/services/setting.service';
import {AccountService} from 'src/app/services/account.service';

@Component({
  selector: 'tm-transfer-definition-page',
  templateUrl: './transfer-definition-page.component.html',
  styleUrls: ['./transfer-definition-page.component.scss']
})
export class TransferDefinitionPageComponent extends BaseForm {

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
              route: ActivatedRoute,
              private router: Router,
              private transferHttpService: TransferHttpService,
              private accountService: AccountService,
              private categoryHttpService: CategoryHttpService,
              private settingService: SettingService) {

    super(el, fb);

    this.buildForm([
      [this.SOURCE_ACCOUNT, true],
      [this.DESTINATION_ACCOUNT, true],
      [this.CATEGORY, true],
      [this.NAME, [Validators.required, Validators.maxLength(100)]],
      [this.DESCRIPTION, Validators.maxLength(255)]
    ]);

    let definitionId = route.snapshot.params[Path.params.id];
    if (definitionId) {
      this.transferHttpService.getById(definitionId).subscribe(definition => {
        this.definition = definition;
        this.fillForm(definition);
      });
    }

    this.accountService.accounts$.subscribe(accounts => {
      this.accounts = accounts;
    });

    this.categoryHttpService.getAll().subscribe(categories => {
      this.categories = categories;
    });

    this.settingService.settings$.subscribe(settings => {
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
      this.transferHttpService.saveOrUpdate(this.readForm()).subscribe(account => {
        this.router.navigateByUrl(Path.transferDefinitions());
      });
    }
  }

  onCancel() {
    this.router.navigateByUrl(Path.transferDefinitions());
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

  private readForm(): TransferDefinition {
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
