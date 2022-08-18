import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {BaseInput} from '../base-input/base-input';

@Component({
  selector: 'tm-input-radio-group',
  templateUrl: './input-radio-group.component.html',
  styleUrls: ['./input-radio-group.component.scss']
})
export class InputRadioGroupComponent extends BaseInput {
  @Input() control: AbstractControl;
  @Input() label: string;
  @Input() labelStyle: object;
  @Input() options: Option[];
}

export type Option = {label: string, value: any};
