import {Component, OnInit} from '@angular/core';
import {Entry} from 'src/app/model/entry';
import {TableData} from 'src/app/model/tableData';
import {TableParams} from 'src/app/model/tableParams';
import {DialogConfig} from '../common/dialog/dialog.component';
import {Category} from 'src/app/model/category';
import {CategoryHttpService} from 'src/app/services/category.http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'tm-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {

  tableData: TableData<Category>;

  dialogConfig = new DialogConfig();

  private tableParams: TableParams;

  constructor(
    private router: Router,
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

  onRowClick(category: Category): void {
    this.router.navigateByUrl(`/category/${category.id}`);
  }

  onRemoveClick(category: Category): void {
    this.dialogConfig = DialogConfig.confirmation('Uwaga', `Czy na pewno chcesz usunąć wpis ${category.name}?`,
      () => {
        console.log('delete ' + category.id);
      });
  }

  private reloadTableRows() {
    this.categoryHttpService.getTable(this.tableParams).subscribe(result => {
      this.tableData = result;
    });
  }

}
