import {Component, Input} from '@angular/core';
import {DialogMode} from 'src/app/enums/dialog-mode';

@Component({
  selector: 'tm-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  readonly DialogMode = DialogMode;

  @Input() config: DialogConfig;

  onCloseClick(): void {
    this.closeDialog();
  }

  onAcceptClick(): void {
    this.config.onAccept();
    this.closeDialog();
  }

  private closeDialog(): void {
    this.config.mode = DialogMode.HIDDEN;
  }
}

export class DialogConfig {
  header: string;
  message: string;
  acceptText: string = 'OK';
  closeText: string = 'Anuluj';
  mode: DialogMode = DialogMode.HIDDEN;
  width: string = '500px';
  onAccept: (param?: any) => void;

  static confirmation(header: string, message: string, onAccept: (param?: any) => void, params?: object) {
    const config = new DialogConfig();
    config.mode = DialogMode.PREVIEW;
    config.header = header;
    config.message = message;
    config.onAccept = onAccept;
    Object.assign(config, params);
    return config;
  }
}
