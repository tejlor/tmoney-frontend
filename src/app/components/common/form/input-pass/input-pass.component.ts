import {Component, Input} from '@angular/core';
import {BaseInput} from '../base-input/base-input';
import {TFormControl} from '../form-control';

@Component({
  selector: 'tm-input-pass',
  templateUrl: './input-pass.component.html'
})
export class InputPasswordComponent extends BaseInput {
  @Input() label: string;
  @Input() labelStyle: object;
  @Input() control: TFormControl;
}
