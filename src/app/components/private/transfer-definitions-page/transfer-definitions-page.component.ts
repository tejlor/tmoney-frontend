import {Component, OnInit} from '@angular/core';
import {TableData} from 'src/app/model/tableData';
import {TableParams} from 'src/app/model/tableParams';
import {Router} from '@angular/router';
import {Path} from 'src/app/app-routing.module';
import {TransferDefinition} from 'src/app/model/transferDefinition';
import {TransferHttpService} from 'src/app/services/transfer.http.service';
import {DialogConfig} from '../../common/dialog/dialog.component';

@Component({
  selector: 'tm-transfer-definitions-page',
  templateUrl: './transfer-definitions-page.component.html',
  styleUrls: ['./transfer-definitions-page.component.scss']
})
export class TransferDefinitionsPageComponent implements OnInit {

  readonly Path = Path;

  tableData: TableData<TransferDefinition>;
  dialogConfig = new DialogConfig();

  private tableParams: TableParams;

  constructor(private router: Router,
              private transferHttpService: TransferHttpService) {

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
    this.router.navigateByUrl(Path.transferDefinition(null));
  }

  onRowClick(definition: TransferDefinition): void {
    this.router.navigateByUrl(Path.transferDefinition(definition.id));
  }

  onRemoveClick($event: MouseEvent, definition: TransferDefinition): void {
    $event.stopPropagation();
    this.dialogConfig = DialogConfig.confirmation('Uwaga', `Czy na pewno chcesz usunąć wpis "${definition.name}"?`,
      () => {
        this.transferHttpService.remove(definition.id).subscribe(() => {
          this.reloadTableRows();
        });
      });
  }

  private reloadTableRows() {
    this.transferHttpService.getTable(this.tableParams).subscribe(result => {
      this.tableData = result;
    });
  }

}
