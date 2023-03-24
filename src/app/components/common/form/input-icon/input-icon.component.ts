import {Component, Input} from '@angular/core';
import {BaseInput} from '../base-input/base-input';
import {TFormControl} from '../form-control';

@Component({
  selector: 'tm-input-icon',
  templateUrl: './input-icon.component.html',
  styleUrls: ['./input-icon.component.scss']
})
export class InputIconComponent extends BaseInput {
  @Input() label: string;
  @Input() labelStyle: object;
  @Input() control: TFormControl;
}
