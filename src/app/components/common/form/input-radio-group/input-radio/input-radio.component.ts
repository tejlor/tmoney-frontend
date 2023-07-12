import {Component, Input} from '@angular/core';
import {BaseInput} from '../../base-input/base-input';
import {TFormControl} from '../../form-control';

@Component({
  selector: 'tm-input-radio',
  templateUrl: './input-radio.component.html'
})
export class InputRadioComponent extends BaseInput {

  @Input() label: string;
  @Input() control: TFormControl;
  @Input() value: any;
}
