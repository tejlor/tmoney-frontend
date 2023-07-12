import {Component, Input} from '@angular/core';
import {BaseInput} from '../base-input/base-input';
import {TFormControl} from '../form-control';

@Component({
  selector: 'tm-input-color',
  templateUrl: './input-color.component.html',
  styleUrls: ['./input-color.component.scss']
})
export class InputColorComponent extends BaseInput {

  @Input() label: string;
  @Input() labelStyle: object;
  @Input() control: TFormControl;


  getColor(): string {
    let value = this.control.value as string;
    if (value?.length === 6) {
      return '#' + value;
    }
    else {
      return '#CCCCCC';
    }
  }
}
