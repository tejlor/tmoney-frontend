import {ActivatedRoute, Router} from "@angular/router";
import {TableParams} from "src/app/model/tableParams";

export abstract class TablePage {

  tableParams: TableParams;


  constructor(protected router: Router,
              protected route: ActivatedRoute) {
  }

  protected initTableParams(sortBy: string): void {
    this.tableParams = new TableParams();
    this.tableParams.pageNo = Number(this.queryParam('pageNo') ?? 0); // if param is empty, Number return NaN and ?? doesn't work
    this.tableParams.pageSize = Number(this.queryParam('pageSize') ?? 20);
    this.tableParams.filter = this.queryParam('filterText') ?? '';
    this.tableParams.sortBy = sortBy;
  }

  onFilterChange(filterText: any) {
    if (typeof(filterText) !== 'string') { // may be object
      return;
    }
    this.tableParams.filter = filterText as string;
    this.addParamToUrlQuery({filterText});
    this.reloadTableRows();
  }

  onPageSizeChange(pageSize: number): void {
    this.tableParams.pageSize = pageSize;
    this.addParamToUrlQuery({pageSize});
    this.reloadTableRows();
  }

  onPageNoChange(pageNo: number): void {
    this.tableParams.pageNo = pageNo;
    this.addParamToUrlQuery({pageNo});
    this.reloadTableRows();
  }

  protected abstract reloadTableRows(): void;

  private addParamToUrlQuery(param: any) {
    this.router.navigate([], {
      queryParams: param,
      queryParamsHandling: 'merge'
    });
  }

  private queryParam(name: string) {
    return this.route.snapshot.queryParams[name];
  }
}