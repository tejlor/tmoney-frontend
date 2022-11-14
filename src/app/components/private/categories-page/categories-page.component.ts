import {Component, OnInit} from '@angular/core';
import {TableData} from 'src/app/model/tableData';
import {TableParams} from 'src/app/model/tableParams';
import {Category} from 'src/app/model/category';
import {CategoryHttpService} from 'src/app/services/category.http.service';
import {Router} from '@angular/router';
import {CategoryDeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {Path} from 'src/app/app-routing.module';
import {DEC_FORMAT} from 'src/app/utils/constants';

@Component({
  selector: 'tm-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {

  readonly DEC_FORMAT = DEC_FORMAT;

  tableData: TableData<Category>;
  dialogConfig = new CategoryDeleteDialogComponent.Config();

  private tableParams: TableParams;

  constructor(private router: Router,
              private categoryHttpService: CategoryHttpService) {

  }

  ngOnInit(): void {
    this.tableParams = new TableParams();
    this.tableParams.pageNo = 0;
    this.tableParams.pageSize = 10;
    this.tableParams.sortBy = 'name ASC';
    this.tableParams.filter = '';
    this.reloadTableRows();
  }

  search(filterText: string) {
    this.tableParams.filter = filterText;
    this.reloadTableRows();
  }

  onPageSizeChange(pageSize: number): void {
    this.tableParams.pageSize = pageSize;
    this.reloadTableRows();
  }

  onPageChange(pageNo: number): void {
    this.tableParams.pageNo = pageNo;
    this.reloadTableRows();
  }

  onAddClick(): void {
    this.router.navigateByUrl(Path.category(null));
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

  private reloadTableRows() {
    this.categoryHttpService.getTable(this.tableParams).subscribe(result => {
      this.tableData = result;
    });
  }

}
