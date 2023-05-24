import {Component, Input} from '@angular/core';

@Component({
  selector: 'tm-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  @Input() config: DialogConfig;


  onClose(): void {
    this.closeDialog();
  }

  onAccept(): void {
    this.config.onAccept();
    this.closeDialog();
  }

  private closeDialog(): void {
    this.config.visible = false;
  }
}

export class DialogConfig {
  header: string;
  message: string;
  acceptText: string = 'OK';
  closeText: string = 'Anuluj';
  visible: boolean = false;
  width: string = '500px';
  onAccept: (param?: any) => void;

  static confirmation(header: string, message: string, onAccept: (param?: any) => void, params?: object) {
    const config = new DialogConfig();
    config.visible = true;
    config.header = header;
    config.message = message;
    config.onAccept = onAccept;
    Object.assign(config, params);
    return config;
  }
}
