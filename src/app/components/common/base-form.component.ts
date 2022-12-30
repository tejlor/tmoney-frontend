import {ElementRef} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Observer} from "rxjs";
import {TFormControl} from "./form/form-control";

export class BaseFormComponent {

  formGroup: FormGroup;

  constructor(
      private el: ElementRef,
      private fb: FormBuilder) {
  }

  /**
   * 0 - name
   * 1 - validators
   * 2 - onChange
   */
  buildForm(controls: any[]) {
    const group: {[key: string]: any} = {};
    const subscriptions: {[key: string]: Partial<Observer<any>>} = {};

    controls.forEach(control => {
      const name: string = control[0];
      const validators: ValidatorFn|ValidatorFn[]|null = control.length > 1
        ? control[1] === true ? Validators.required : control[1]
        : null;
      const onChange: Partial<Observer<any>> = control.length > 2 ? control[2] : null;

      group[name] = new TFormControl(name, '', validators);
      if (onChange) {
        subscriptions[name] = onChange;
      }
    });

    this.formGroup = this.fb.group(group);

    Object.keys(subscriptions).forEach(key => {
      this.formGroup.controls[key].valueChanges.subscribe(subscriptions[key]);
    });
  }

  control(key: string): AbstractControl {
    return this.formGroup.controls[key];
  }

  controlValue(key: string): any {
    return this.control(key).value;
  }

  isValid(): boolean {
    if (!this.isFormValid()) {
      this.scrollToFirstInvalidControl();
      return false;
    }
    return true;
  }

  private isFormValid(): boolean {
    this.formGroup.markAllAsTouched();
    return this.formGroup.valid;
  }

  private scrollToFirstInvalidControl() {
    this.el.nativeElement.querySelector('.invalid')
      ?.scrollIntoview({behaviour: 'smooth', block: 'nearest', inline: 'start'});
  }
}