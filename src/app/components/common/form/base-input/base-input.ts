import {AbstractControl} from '@angular/forms';
import {TFormControl} from '../form-control';

export abstract class BaseInput {

  control: AbstractControl;

  get formControl() {
    return this.control as TFormControl;
  }

  isInvalid(): boolean {
    return this.control.touched && this.control.invalid;
  }

  getErrorMessage(): string {
    if(!this.isInvalid()) {
      return null;
    }

    if(this.control.hasError('required')) {
      return 'Pole wymagane';
    }

    return 'Niepoprawna wartość';
  }

}