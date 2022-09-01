import {ElementRef} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observer} from "rxjs";

export class BaseFormComponent {

  formGroup: FormGroup;

  constructor(
    private el: ElementRef,
    private fb: FormBuilder) {

  }

  buildForm(controls: any[]) {
    const group: {[key: string]: any} = {};
    const subscriptions: {[key: string]: Partial<Observer<any>>} = {};

    controls.forEach(control => {
      switch(control.length) {
        case 1:
          group[control[0]] = [''];
          break;
        case 2:
          if (control[1] === true) {
            group[control[0]] = ['', Validators.required];
          }
          else {
            group[control[0]] = ['', control[1]];
          }
          break;
        case 3:
          if (control[1] === true) {
            group[control[0]] = ['', Validators.required];
          }
          else {
            group[control[0]] = ['', control[1]];
          }
          subscriptions[control[0]] = control[2];
          break;
        default:
          throw new Error("Invalid array length");
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
