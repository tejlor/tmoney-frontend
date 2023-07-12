import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

@Directive({
  selector: 'input[type=file]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FileValueAccessor,
    multi: true
  }]
})
export class FileValueAccessor implements ControlValueAccessor {

  @Output('value') onSetValue = new EventEmitter<string>();

  private onChange: Function;


  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
  }

  @HostListener('blur')
  onTouched = () => {

  }

  writeValue(value: string) {
    this.onSetValue.emit(value);
  }

  registerOnChange(fn: (_: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {

  }
}