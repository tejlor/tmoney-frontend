import {Component, Input} from '@angular/core';
import {BaseInput} from '../base-input/base-input';
import {TFormControl} from '../form-control';

@Component({
  selector: 'tm-input-file',
  templateUrl: './input-file.component.html'
})
export class InputFileComponent extends BaseInput {

  @Input() label: string;
  @Input() labelStyle: object;
  @Input() control: TFormControl;

  private allowedTypes = ['text/csv'];
  private maxSize = 10 * 1024;  // 10 KB


  onFileSelected($event: Event): boolean {
    const target = $event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files[0];

    if (!this.validateFile(file)) {
      return false;
    }

    return true;
  }

  private validateFile(file: File): boolean {
    if (file.size > this.maxSize) {
      this.control.setErrors({
        fileSize: {
          current: file.size,
          max: this.maxSize
        }
      });
      return false;
    }

    if (!this.allowedTypes.includes(file.type)) {
      this.control.setErrors({
        fileType: {
          current: file.type,
          allowed: this.allowedTypes
        }
      });
      return false;
    }

    return true;
  }

}
