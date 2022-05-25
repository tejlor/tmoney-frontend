import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {BaseInput} from '../base-input/base-input';

@Component({
  selector: 'tm-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends BaseInput {
  @Input() control: AbstractControl;
  @Input() options: Option[];
}

export interface Option {
  id: number;
  name: string;
}
