import {formatNumber} from '@angular/common';
import {Component, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Path} from 'src/app/app-routing.module';
import {TransferDefinition} from 'src/app/model/transferDefinition';
import {TransferRequest} from 'src/app/model/transferRequest';
import {SettingService} from 'src/app/services/setting.service';
import {TransferHttpService} from 'src/app/services/transfer.http.service';
import {DEC_FORMAT} from 'src/app/utils/constants';
import {stringToNumber} from 'src/app/utils/utils';
import {BaseFormComponent} from '../../common/base-form.component';

@Component({
  selector: 'tm-transfer-page',
  templateUrl: './transfer-page.component.html',
  styleUrls: ['./transfer-page.component.scss']
})
export class TransferPageComponent extends BaseFormComponent {

  readonly DATE = 'date';
  readonly NAME = 'name';
  readonly AMOUNT = 'amount';
  readonly DESCRIPTION = 'description';

  definition: TransferDefinition;
  tags: string[];

  constructor(el: ElementRef,
              fb: FormBuilder,
              route: ActivatedRoute,
              private router: Router,
              private settingService: SettingService,
              private transferService: TransferHttpService) {

    super(el, fb);

    this.buildForm([
      [this.DATE, true],
      [this.NAME, true],
      [this.AMOUNT, true],
      [this.DESCRIPTION]
    ]);

    const definitionId = route.snapshot.params['definitionId'];

    this.transferService.getById(definitionId).subscribe(definition => {
      this.definition = definition;
      this.fillDefaultDefinitionValues(definition);
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

  saveAndGoBack(): void {
    if (this.isValid()) {
      this.transferService.createTransfer(this.readObjectFromForm()).subscribe(() => {
        this.router.navigateByUrl(Path.dashboard);
      });
    }
  }

  onCancel(): void {
    this.router.navigateByUrl(Path.dashboard);
  }

  private fillDefaultDefinitionValues(definition: TransferDefinition) {
    this.control(this.NAME).setValue(definition.name);
    this.control(this.DESCRIPTION).setValue(definition.description);
  }

  private formatValueAsAmount(value: number): string {
    return formatNumber(value, 'pl-PL', DEC_FORMAT);
  }

  private readObjectFromForm(): TransferRequest {
    const transfer = new TransferRequest();
    transfer.transferDefinitionId = this.definition.id;
    transfer.date = this.controlValue(this.DATE);
    transfer.name = this.controlValue(this.NAME);
    transfer.amount = stringToNumber(this.controlValue(this.AMOUNT));
    transfer.description = this.controlValue(this.DESCRIPTION);
    return transfer;
  }
}
