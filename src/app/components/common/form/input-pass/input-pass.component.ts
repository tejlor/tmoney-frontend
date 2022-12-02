import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {BaseInput} from '../base-input/base-input';

@Component({
  selector: 'tm-input-pass',
  templateUrl: './input-pass.component.html',
  styleUrls: ['./input-pass.component.scss']
})
export class InputPasswordComponent extends BaseInput {
  @Input() label: string;
  @Input() labelStyle: object;
  @Input() control: AbstractControl;
}
