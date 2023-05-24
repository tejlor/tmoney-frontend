import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {formatAmount} from 'src/app/utils/utils';

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


  constructor(private elementRef: ElementRef<HTMLInputElement>) {
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
    return formatAmount(Number(value.replace(',','.')));
  }

  private unformatValue(value: string): string {
    return value.replace(/[^0-9,-]/g, '') ?? '';
  }

}
