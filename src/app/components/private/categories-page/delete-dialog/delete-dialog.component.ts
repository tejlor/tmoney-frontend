import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {config} from 'rxjs';
import {DialogConfig} from 'src/app/components/common/dialog/dialog.component';
import {DialogMode} from 'src/app/enums/dialog-mode';
import {Category} from 'src/app/model/category';
import {CategoryHttpService} from 'src/app/services/category.http.service';

@Component({
  selector: 'tm-category-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class CategoryDeleteDialogComponent implements OnInit {

  @Input() set config(config: CategoryDeleteDialogComponent.Config) {
    console.log('set');
    if (config.visible) {
      this.show(config.category);
    }
  }

  formGroup: FormGroup;
  categories: Category[];
  dialogConfig = new DialogConfig();

  constructor(
    fb: FormBuilder,
    private categoryHttpService: CategoryHttpService) {

    this.formGroup = fb.group({
      newCategoryId: ['']
    });
  }

  ngOnInit(): void {
    this.categoryHttpService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }

  private show(category: Category): void {
    this.dialogConfig = DialogConfig.confirmation('Uwaga', `Czy na pewno chcesz usunąć wpis "${category.name}"?`,
      () => {
        this.categoryHttpService.remove(category.id, this.formGroup.controls['newCategoryId'].value).subscribe();
      });
  }

}

export namespace CategoryDeleteDialogComponent {
  export class Config {
    visible: boolean;
    category: Category;
  }
}

