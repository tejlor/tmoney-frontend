
import {Component, ElementRef} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Path} from 'src/app/app-routing.module';
import {TransferDefinition} from 'src/app/model/transferDefinition';
import {TransferRequest} from 'src/app/model/transferRequest';
import {TransferHttpService} from 'src/app/services/transfer.http.service';
import {parseAmount} from 'src/app/utils/utils';
import {BaseForm} from '../../common/base-form';

@Component({
  selector: 'tm-transfer-page',
  templateUrl: './transfer-page.component.html',
  styleUrls: ['./transfer-page.component.scss']
})
export class TransferPageComponent extends BaseForm {

  readonly DATE = 'date';
  readonly NAME = 'name';
  readonly AMOUNT = 'amount';
  readonly DESCRIPTION = 'description';

  definition: TransferDefinition;


  constructor(el: ElementRef,
              fb: FormBuilder,
              route: ActivatedRoute,
              private router: Router,
              private transferService: TransferHttpService) {

    super(el, fb);

    this.buildForm([
      [this.DATE, true],
      [this.NAME, true],
      [this.AMOUNT, true],
      [this.DESCRIPTION]
    ]);

    const definitionId = route.snapshot.params[Path.params.definitionId];

    this.transferService.getById(definitionId).subscribe(definition => {
      this.definition = definition;
      this.fillDefaultDefinitionValues(definition);
    });
  }

  onSaveAndGoBack(): void {
    if (this.isValid()) {
      this.transferService.createTransfer(this.readForm()).subscribe(() => {
        this.router.navigateByUrl(Path.dashboard());
      });
    }
  }

  onCancel(): void {
    this.router.navigateByUrl(Path.dashboard());
  }

  private fillDefaultDefinitionValues(definition: TransferDefinition) {
    this.control(this.NAME).setValue(definition.name);
    this.control(this.DESCRIPTION).setValue(definition.description);
  }

  private readForm(): TransferRequest {
    const transfer = new TransferRequest();
    transfer.transferDefinitionId = this.definition.id;
    transfer.date = this.controlValue(this.DATE);
    transfer.name = this.controlValue(this.NAME);
    transfer.amount = parseAmount(this.controlValue(this.AMOUNT));
    transfer.description = this.controlValue(this.DESCRIPTION);
    return transfer;
  }
}
