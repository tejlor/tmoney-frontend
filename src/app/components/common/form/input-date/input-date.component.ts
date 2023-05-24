import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {BaseInput} from '../base-input/base-input';
import {TFormControl} from '../form-control';

@Component({
  selector: 'tm-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent extends BaseInput {

  @Input() label: string;
  @Input() labelStyle: object;
  @Input() control: TFormControl;

  @ViewChild('button') button: ElementRef<HTMLElement>;
}
