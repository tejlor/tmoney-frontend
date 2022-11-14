import {formatNumber} from '@angular/common';
import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {DEC_FORMAT} from 'src/app/utils/constants';

@Directive({
  selector: '[tmNumeric]'
})
export class NumericDirective  {

  @Input() formControl: AbstractControl;

  get value() {
    return this.elementRef.nativeElement.value;
  }
  set value(val: string) {
    this.elementRef.nativeElement.value = val;
  }

  constructor(
    private elementRef: ElementRef<HTMLInputElement>) {
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    this.value = value.replace(/[^0-9,\-]/g, '');
  }

  @HostListener('blur')
  onBlur() {
    this.formatValue();
  }

  @HostListener('focus')
  onFocus() {
    this.unFormatValue();
  }

  private formatValue() {
    if (this.value) {
      this.value = this.formatValueAsAmount(Number(this.value.replace(',','.')));
    }
    else {
      this.value = '';
    }
  }

  private unFormatValue() {
    this.value = this.value.replace(/[^0-9,\-]/g, '') ?? '';
  }

  private formatValueAsAmount(value: number): string {
    return formatNumber(value, 'pl-PL', DEC_FORMAT);
  }

}
