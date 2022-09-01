import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'tm-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Output() change = new EventEmitter<string>();

  private timeoutId: NodeJS.Timeout;
  private filterText: string;

  onKeyUp(event: any) {
    this.filterText = event.target.value;
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.change.emit(this.filterText), 500);
  }

}
