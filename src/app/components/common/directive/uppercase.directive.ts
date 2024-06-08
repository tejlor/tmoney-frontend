import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Directive({
  selector: '[tmUppercase]'
})
export class UppercaseDirective  {

  @Input() formControl: AbstractControl;
  @Input() tmUppercase: boolean = true;

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
    if (this.tmUppercase) {
      this.value = this.formatValue(value);
    }
  }

  private formatValue(value: string): string {
    if (!value) {
      return '';
    }
    return value.toUpperCase();
  }

}
