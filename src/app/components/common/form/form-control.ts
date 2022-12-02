import {AsyncValidatorFn, FormControl, FormControlOptions, ValidatorFn} from "@angular/forms";

export class TFormControl extends FormControl {
  name: string;

  constructor(
      name: string,
      formState: any,
      validatorOrOpts?: ValidatorFn | ValidatorFn[] | FormControlOptions | null,
      asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {

    super(formState, validatorOrOpts, asyncValidator);
    this.name = name;
  }
}