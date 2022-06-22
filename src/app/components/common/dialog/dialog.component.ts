import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {DialogMode} from 'src/app/enums/dialog-mode';

@Component({
  selector: 'tm-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  readonly DialogMode = DialogMode;

  @Input() config: DialogConfig;

  constructor() { }

  ngOnInit(): void {
  }

  onCloseClick(): void {
    this.closeDialog();
  }

  onAcceptClick(): void {
    this.closeDialog();
    this.config.onAccept();
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
  onAccept: (param?: any) => void;

  static confirmation(header: string, message: string, onAccept: ()=>void) {
    const config = new DialogConfig();
    config.mode = DialogMode.PREVIEW;
    config.header = header;
    config.message = message;
    config.onAccept = onAccept;
    return config;
  }
}
