import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tm-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() change = new EventEmitter<string>();

  private timeoutId: NodeJS.Timeout;
  private filterText: string;

  constructor() { }

  ngOnInit(): void {
  }

  onKeyUp(event: any) {
    this.filterText = event.target.value;
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.change.emit(this.filterText), 500);
  }

}
