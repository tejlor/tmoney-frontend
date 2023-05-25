import {Component, OnInit} from '@angular/core';
import {TableData} from 'src/app/model/tableData';
import {TableParams} from 'src/app/model/tableParams';
import {Category} from 'src/app/model/category';
import {CategoryHttpService} from 'src/app/services/category.http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryDeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {Path} from 'src/app/app-routing.module';
import {DEC_FORMAT} from 'src/app/utils/constants';
import {BaseTablePage} from '../_common/base-table-page';

@Component({
  selector: 'tm-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent extends BaseTablePage implements OnInit {

  readonly Path = Path;
  readonly DEC_FORMAT = DEC_FORMAT;

  tableData: TableData<Category>;
  tableParams: TableParams;
  dialogConfig = new CategoryDeleteDialogComponent.Config();


  constructor(router: Router,
              route: ActivatedRoute,
              private categoryHttpService: CategoryHttpService) {

    super(router, route);
  }

  ngOnInit(): void {
    this.initTableParams('name ASC');
    this.reloadTableRows();
  }

  onRowClick(category: Category): void {
    this.router.navigateByUrl(Path.category(category.id));
  }

  onDeleteClick($event: MouseEvent, category: Category): void {
    $event.stopPropagation();
    this.dialogConfig = new CategoryDeleteDialogComponent.Config();
    this.dialogConfig.visible = true;
    this.dialogConfig.category = category;
  }

  onDeleteConfirm() {
    this.reloadTableRows();
  }

  protected reloadTableRows() {
    this.categoryHttpService.getTable(this.tableParams).subscribe(result => {
      this.tableData = result;
    });
  }

}
