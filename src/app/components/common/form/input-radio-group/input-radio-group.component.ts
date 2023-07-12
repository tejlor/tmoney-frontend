import {Component, Input} from '@angular/core';
import {BaseInput} from '../base-input/base-input';
import {TFormControl} from '../form-control';

@Component({
  selector: 'tm-input-radio-group',
  templateUrl: './input-radio-group.component.html'
})
export class InputRadioGroupComponent extends BaseInput {

  @Input() label: string;
  @Input() labelStyle: object;
  @Input() control: TFormControl;
  @Input() options: Option[];

}

export type Option = {label: string, value: any};
