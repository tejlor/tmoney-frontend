import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {BaseInput} from '../base-input/base-input';

@Component({
  selector: 'tm-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.scss']
})
export class InputRadioComponent extends BaseInput {
  @Input() control: AbstractControl;
  @Input() value: any;
  @Input() label: string;
}
