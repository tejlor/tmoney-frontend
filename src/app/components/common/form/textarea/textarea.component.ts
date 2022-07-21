import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {BaseInput} from '../base-input/base-input';

@Component({
  selector: 'tm-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent extends BaseInput {
  @Input() label: string;
  @Input() labelStyle: object;
  @Input() control: AbstractControl;
}
