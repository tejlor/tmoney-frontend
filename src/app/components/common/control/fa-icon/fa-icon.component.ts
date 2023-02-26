import {Component, Input} from '@angular/core';

@Component({
  selector: 'tm-fa-icon',
  templateUrl: './fa-icon.component.html'
})
export class FaIconComponent {
  @Input() value: string;
}
