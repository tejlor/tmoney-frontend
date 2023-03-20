import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {BaseInput} from '../base-input/base-input';

@Component({
  selector: 'tm-select',
  templateUrl: './select.component.html'
})
export class SelectComponent extends BaseInput {
  @Input() label: string;
  @Input() labelStyle: object;
  @Input() control: AbstractControl;
  @Input() options: Option[];

  compareById(element1: Option, element2: Option): boolean {
    return element1?.id === element2?.id;
  }
}

export interface Option {
  id: number;
  name: string;
}
