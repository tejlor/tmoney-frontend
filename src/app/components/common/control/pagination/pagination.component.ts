import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TableInfo} from 'src/app/model/tableInfo';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'tm-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  readonly pageSizeOptions = [10, 20, 50, 1000];

  @Input() pageNo = 0;
  @Input() pageSize = 20;
  @Input() color = environment.blueThemeColor;

  @Input() set tableInfo(value: TableInfo) {
    this._tableInfo = value;
    if (value) {
      this.visiblePages = this.calcVisiblePages(this.pageNo, value.pageCount);
    }
  }

  visiblePages: (number | null)[];

  private _tableInfo: TableInfo;

  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<number>();


  onPageSizeChange(event: any): void {
    this.pageSizeChange.emit(event.target.value);
  }

  calcVisiblePages(current: number, total: number): number[] {
    let left = current - 1;
    let right = current + 2;
    let range = [];

    for (let i = 0; i < total; i++) {
      if (i === 0 || i === total - 1 || (i >= left && i < right)) {
        range.push(i);
      }
    }

    let last = null;
    let rangeWithDots: number[] = [];
    for (let i of range) {
      if (last != null) {
        if (i - last !== 1) {
          rangeWithDots.push(null);
        }
      }
      rangeWithDots.push(i);
      last = i;
    }
    return rangeWithDots;
  }

  canPrev(): boolean {
    return this.pageNo > 0;
  }

  canNext(): boolean {
    return this._tableInfo && this.pageNo < this._tableInfo.pageCount - 1;
  }

  goPrev() {
    this.pageNo--;
    this.pageChange.emit(this.pageNo);
  }

  goNext() {
    this.pageNo++;
    this.pageChange.emit(this.pageNo);
  }

  changePage(pageNo: number): void {
    this.pageNo = pageNo;
    this.pageChange.emit(this.pageNo);
  }

}
