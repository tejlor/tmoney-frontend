import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BaseFormComponent} from 'src/app/components/common/base-form.component';
import {DialogConfig} from 'src/app/components/common/dialog/dialog.component';
import {Category} from 'src/app/model/category';
import {CategoryHttpService} from 'src/app/services/category.http.service';

@Component({
  selector: 'tm-category-delete-dialog',
  templateUrl: './delete-dialog.component.html'
})
export class CategoryDeleteDialogComponent extends BaseFormComponent implements OnInit {

  readonly NEW_CATEGORY_ID = 'newCategoryId';

  @Input() set config(config: CategoryDeleteDialogComponent.Config) {
    if (config.visible) {
      this.show(config.category);
    }
  }

  @Output() onConfirm = new EventEmitter<void>();

  formGroup: FormGroup;
  categories: Category[];
  dialogConfig = new DialogConfig();


  constructor(el: ElementRef,
              fb: FormBuilder,
              private categoryHttpService: CategoryHttpService) {

    super(el, fb);

    this.buildForm([
      [this.NEW_CATEGORY_ID]
    ]);
  }

  ngOnInit(): void {
    this.categoryHttpService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }

  private show(category: Category): void {
    this.dialogConfig = DialogConfig.confirmation('Uwaga', `Czy na pewno chcesz usunąć wpis '"${category.name}"'?`,
      () => {
        this.categoryHttpService.remove(category.id, this.controlValue(this.NEW_CATEGORY_ID))
          .subscribe(() => this.onConfirm.emit());
      },
      {
        width: '500px'
      });
  }

}

export namespace CategoryDeleteDialogComponent {
  export class Config {
    visible: boolean;
    category: Category;
  }
}

