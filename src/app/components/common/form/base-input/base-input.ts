import {TFormControl} from '../form-control';

export abstract class BaseInput {

  control: TFormControl;


  isInvalid(): boolean {
    return this.control.touched && this.control.invalid;
  }

  getErrorMessage(): string {
    if (!this.isInvalid()) {
      return null;
    }

    console.log(this.control.errors);
    

    if (this.control.hasError('required')) {
      return 'Pole wymagane';
    }

    if (this.control.hasError('min')) {
      return `Minimalna wartość to: ${this.control.errors['min'].min}`;
    }

    if (this.control.hasError('max')) {
      return `Maksymalna wartość to: ${this.control.errors['max'].max}`;
    }

    if (this.control.hasError('minlength')) {
      return `Minimalna długość tekstu to: ${this.control.errors['minlength'].requiredLength} znaków`;
    }

    if (this.control.hasError('maxlength')) {
      return `Maksymalna długość tekstu to: ${this.control.errors['maxlength'].requiredLength} znaków`;
    }

    if (this.control.hasError('pattern')) {
      return `Dozwolony format wartości to: ${this.control.errors['pattern'].requiredPattern}`;
    }

    if (this.control.hasError('fileSize')) {
      return `Maksymalny rozmiar pliku to: ${this.control.errors['fileSize'].max}, obecny: ${this.control.errors['fileSize'].current}`;
    }

    if (this.control.hasError('fileType')) {
      return `Dozwolone typy plików to: ${this.control.errors['fileType'].allowed}, obecny: ${this.control.errors['fileType'].current}`;
    }

    if (this.control.hasError('imgHeight')) {
      return `Dozwolona wysokość obrazka to: ${this.control.errors['imgHeight'].required}, obecna: ${this.control.errors['imgHeight'].current}`;
    }

    return 'Niepoprawna wartość';
  }

}