import {Component, OnInit} from '@angular/core';
import {TableData} from 'src/app/model/tableData';
import {TableParams} from 'src/app/model/tableParams';
import {ActivatedRoute, Router} from '@angular/router';
import {Path} from 'src/app/app-routing.module';
import {TransferDefinition} from 'src/app/model/transferDefinition';
import {DialogConfig} from '../../common/dialog/dialog.component';
import {BaseTablePage} from '../_common/base-table-page';
import {TransferDefinitionHttpService} from 'src/app/services/transfer-definition.http.service';
import {Title} from '@angular/platform-browser';
import {TITLE_POSTFIX} from 'src/app/utils/constants';

@Component({
  selector: 'tm-transfer-definitions-page',
  templateUrl: './transfer-definitions-page.component.html',
  styleUrls: ['./transfer-definitions-page.component.scss']
})
export class TransferDefinitionsPageComponent extends BaseTablePage implements OnInit {

  readonly Path = Path;

  tableData: TableData<TransferDefinition>;
  tableParams: TableParams;
  dialogConfig = new DialogConfig();


  constructor(router: Router,
              route: ActivatedRoute,
              private titleService: Title,
              private transferDefinitionHttpService: TransferDefinitionHttpService) {

    super( router, route);
  }

  ngOnInit(): void {
    this.titleService.setTitle(`Definicje przelewów ${TITLE_POSTFIX}`);
    this.initTableParams('sourceAccount.orderNo ASC');
    this.reloadTableRows();
  }

  onRowClick(definition: TransferDefinition): void {
    this.router.navigateByUrl(Path.transfer(definition.id));
  }

  onRemoveClick($event: MouseEvent, definition: TransferDefinition): void {
    $event.stopPropagation();
    this.dialogConfig = DialogConfig.confirmation('Uwaga', `Czy na pewno chcesz usunąć wpis "${definition.name}"?`,
      () => {
        this.transferDefinitionHttpService.remove(definition.id).subscribe(() => {
          this.reloadTableRows();
        });
      });
  }

  protected reloadTableRows() {
    this.transferDefinitionHttpService.getTable(this.tableParams).subscribe(result => {
      this.tableData = result;
    });
  }

}
