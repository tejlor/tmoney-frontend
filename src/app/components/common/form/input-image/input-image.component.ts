import {Component, Input} from '@angular/core';
import {BaseInput} from '../base-input/base-input';
import {TFormControl} from '../form-control';

@Component({
  selector: 'tm-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.scss']
})
export class InputImageComponent extends BaseInput {

  @Input() label: string;
  @Input() labelStyle: object;
  @Input() control: TFormControl;

  private allowedTypes = ['image/jpeg'];
  private maxSize = 25 * 1024;  // 25 KB
  private requiredHeight = 60;  // 60px

  fileBase64: string;


  onFileSelected($event: Event): boolean {
    const target = $event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files[0];

    if (!this.validateFile(file)) {
      return false;
    }

    const reader = new FileReader();
    reader.onload = this.onFileLoad.bind(this);
    reader.readAsDataURL(file);
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

  private onFileLoad(event: any): void {
    const image = new Image();
    image.src = event.target.result;
    image.onload = (rs: any) => {
      const height = rs.currentTarget['height'];
      if (height !== this.requiredHeight) {
        this.control.setErrors({
          imgHeight: {
            current: height,
            required: this.requiredHeight
          }
        });
        return false;
      }
      else {
        const imgBase64Path = event.target.result;
        this.fileBase64 = imgBase64Path;
        return true;
      }
    };
  }

  onSetFileBase64(base64: string): void {
    this.fileBase64 = base64;
  }
}
