import {Component, Input} from '@angular/core';
import {BaseInput} from '../base-input/base-input';
import {TFormControl} from '../form-control';

@Component({
  selector: 'tm-textarea',
  templateUrl: './textarea.component.html'
})
export class TextareaComponent extends BaseInput {
  @Input() label: string;
  @Input() labelStyle: object;
  @Input() control: TFormControl;
}
