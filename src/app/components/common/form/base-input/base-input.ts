import {AbstractControl, FormControl} from '@angular/forms';

export abstract class BaseInput {

  control: AbstractControl;

  get formControl() {
    return this.control as FormControl;
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