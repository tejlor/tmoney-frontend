import {AsyncValidatorFn, FormControl, FormControlOptions, ValidatorFn, Validators} from "@angular/forms";

export class TFormControl extends FormControl {

  name: string;
  required: boolean;

  constructor(
      name: string,
      formState: any,
      validatorOrOpts?: ValidatorFn | ValidatorFn[] | FormControlOptions | null,
      asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {

    super(formState, validatorOrOpts, asyncValidator);
    this.name = name;
  }

  isRequired(): boolean {
    return this.hasValidator(Validators.required);
  }
}