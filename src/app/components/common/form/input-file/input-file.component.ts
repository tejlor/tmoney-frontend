import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {BaseInput} from '../base-input/base-input';

@Component({
  selector: 'tm-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss']
})
export class InputFileComponent extends BaseInput {

  @Input() label: string;
  @Input() labelStyle: object;
  @Input() control: AbstractControl;

  private allowedTypes = ['image/jpeg'];
  private maxSize = 25 * 1024;  // 25 KB
  private requiredHeight = 60;  // 60px

  logoBase64: string;


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
        this.logoBase64 = imgBase64Path;
        return true;
      }
    };
  }

  onSetFileBase64(base64: string): void {
    this.logoBase64 = base64;
  }
}
