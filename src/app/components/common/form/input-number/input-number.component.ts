import {Component, Input} from '@angular/core';
import {BaseInput} from '../base-input/base-input';
import {TFormControl} from '../form-control';

@Component({
  selector: 'tm-input-number',
  templateUrl: './input-number.component.html'
})
export class InputNumberComponent extends BaseInput {
  @Input() label: string;
  @Input() labelStyle: object;
  @Input() control: TFormControl;
}
