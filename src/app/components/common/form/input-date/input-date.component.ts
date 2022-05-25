import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {BaseInput} from '../base-input/base-input';

@Component({
  selector: 'tm-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent extends BaseInput {
  @Input() control: AbstractControl;
}
