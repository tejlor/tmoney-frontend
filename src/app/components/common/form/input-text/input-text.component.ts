import {Component, Input} from '@angular/core';
import {BaseInput} from '../base-input/base-input';
import {TFormControl} from '../form-control';

@Component({
  selector: 'tm-input-text',
  templateUrl: './input-text.component.html'
})
export class InputTextComponent extends BaseInput {

  @Input() label: string;
  @Input() labelStyle: object;
  @Input() control: TFormControl;
  @Input() uppercase: boolean = false;

}
