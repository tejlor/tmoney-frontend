import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'tm-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Input() value = '';
  @Output() change = new EventEmitter<string>();

  private timeoutId: NodeJS.Timeout;

  onKeyUp(event: any) {
    this.value = event.target.value;
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.change.emit(this.value), 500);
  }

}
