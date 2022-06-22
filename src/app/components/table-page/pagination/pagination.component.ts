import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableInfo } from 'src/app/model/tableInfo';

@Component({
  selector: 'tm-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  private static DELTA = 1;

  @Input() color: string;

  private _tableInfo: TableInfo;
  @Input() set tableInfo(value: TableInfo) {
    this._tableInfo = value;
    if (value) {
      this.visiblePages = this.calcVisiblePages(this.pageNo, value.pageCount);
    }
  }

  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<number>();

  pageNo = 0;
  visiblePages: (number | null)[];

  constructor() { }

  ngOnInit(): void {
  }

  onPageSizeChange(event: any): void {
    this.pageSizeChange.emit(event.target.value);
  }

  calcVisiblePages(current: number, total: number): number[] {
    let left = current - PaginationComponent.DELTA;
    let right = current + PaginationComponent.DELTA + 1;
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
