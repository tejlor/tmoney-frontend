import {Directive, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {DATE_FORMAT} from 'src/app/utils/constants';
import {DatePickerComponent} from './date-picker.component';
import {InputDateComponent} from '../../form/input-date/input-date.component';

@Directive({
  selector: '[tmDatePicker]'
})
export class DatePickerDirective implements OnInit {

  @Input() tmDatePicker: DatePickerComponent;
  @Input() control: AbstractControl;


  constructor(private input: InputDateComponent) {
  }

  ngOnInit(): void {
    this.tmDatePicker.onSelect.subscribe(date => this.control.setValue(date.format(DATE_FORMAT)));

    setTimeout(() =>
      this.input.button.nativeElement.addEventListener('click', () => this.tmDatePicker.show(this.control.value))
    , 500); // wait until Angular creates all elements
  }

}
