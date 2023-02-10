import {formatNumber} from '@angular/common';
import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {DEC_FORMAT} from 'src/app/utils/constants';

@Directive({
  selector: '[tmDecimal]'
})
export class DecimalDirective  {

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
    this.value = this.unformatValue(value);
  }

  @HostListener('blur')
  onBlur() {
    this.value = this.formatValue(this.value);
  }

  @HostListener('focus')
  onFocus() {
    this.value = this.unformatValue(this.value);
  }

  private formatValue(value: string): string {
    if (!value) {
      return '';
    }
    return this.formatValueAsAmount(Number(value.replace(',','.')));
  }

  private formatValueAsAmount(value: number): string {
    return formatNumber(value, 'pl-PL', DEC_FORMAT);
  }

  private unformatValue(value: string): string {
    return value.replace(/[^0-9,-]/g, '') ?? '';
  }

}
