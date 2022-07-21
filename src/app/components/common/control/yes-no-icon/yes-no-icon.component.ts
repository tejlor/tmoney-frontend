import {Component, Input} from '@angular/core';

@Component({
  selector: 'tm-yes-no-icon',
  templateUrl: './yes-no-icon.component.html'
})
export class YesNoIconComponent {
  @Input() value: boolean;
}
