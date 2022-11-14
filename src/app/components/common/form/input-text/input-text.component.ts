import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {BaseInput} from '../base-input/base-input';

@Component({
  selector: 'tm-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent extends BaseInput {
  @Input() label: string;
  @Input() name: string;
  @Input() labelStyle: object;
  @Input() control: AbstractControl;
}
