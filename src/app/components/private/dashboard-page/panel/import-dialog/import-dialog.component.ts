import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BaseForm} from 'src/app/components/common/base-form';
import {DialogConfig} from 'src/app/components/common/dialog/dialog.component';
import {Category} from 'src/app/model/category';
import {Entry} from 'src/app/model/entry';
import {CategoryHttpService} from 'src/app/services/category.http.service';
import {EntryHttpService} from 'src/app/services/entry.http.service';

@Component({
  selector: 'tm-transactions-import-dialog',
  templateUrl: './import-dialog.component.html'
})
export class TransactionsImportDialogComponent extends BaseForm {

  readonly FILE = 'FILE';

  @Input() set config(config: TransactionsImportDialogComponent.Config) {
    if (config.visible) {
      this.show();
    }
  }

  @Output() onConfirm = new EventEmitter<Entry[]>();

  formGroup: FormGroup;
  categories: Category[];
  dialogConfig = new DialogConfig();


  constructor(el: ElementRef,
              fb: FormBuilder,
              private entryHttpService: EntryHttpService) {

    super(el, fb);

    this.buildForm([
      [this.FILE, true]
    ]);
  }

  private show(): void {
    this.dialogConfig = DialogConfig.confirmation('Import transakcji', 'Wskaż plik CSV do zaimportowaniaa transakcji z banku.',
      () => {
        this.entryHttpService.importTransactions(this.controlValue(this.FILE))
          .subscribe((entries) => this.onConfirm.emit(entries));
      },
      {
        width: '500px'
      });
  }

}

export namespace TransactionsImportDialogComponent {
  export class Config {
    visible: boolean;
  }
}

