import { Directive, Input, OnInit } from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {DatepickerComponent} from '../control/datepicker/datepicker.component';
import {InputDateComponent} from '../form/input-date/input-date.component';

@Directive({
  selector: '[tmDatepicker]'
})
export class DatepickerDirective implements OnInit {

  @Input() tmDatepicker: DatepickerComponent;
  @Input() control: AbstractControl;

  constructor(
    private input: InputDateComponent) {
  }

  ngOnInit(): void {
    this.tmDatepicker.onSelect.subscribe(date => this.control.setValue(date.format('YYYY-MM-DD')));

    setTimeout(() =>
      this.input.button.nativeElement.addEventListener('click', () => this.tmDatepicker.show(this.control.value))
    , 500);
  }

}
