import {Component, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';
import * as moment from 'moment';
import {firstUpperCase} from 'src/app/utils/utils';

@Component({
  selector: 'tm-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent {

  @Output('select') onSelect = new EventEmitter<moment.Moment>();

  readonly dayNames = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'N'];
  readonly monthNames = moment.months().map(m => firstUpperCase(m));

  selectedDate: moment.Moment;
  currentDate: moment.Moment;
  currentDay: number;
  currentMonth: number;
  currentYear: number;
  calendar: moment.Moment[][];
  visible: boolean;

  constructor(private el: ElementRef) {;
    this.currentDate = moment().startOf('month');
    this.recalculate();
  }

  // hide calendar after click outside
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: MouseEvent): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.visible = false;
    }
  }

  show(value: string) {
    this.selectedDate = value ? moment(value, 'YYYY-MM-DD') : null;
    this.currentDate = this.selectedDate
      ? this.selectedDate.startOf('month')
      : moment().startOf('month');
    this.recalculate();
    this.visible = true;
  }

  onNextYearClick() {
    this.currentDate.add(1, 'year');
    this.recalculate();
  }

  onPrevYearClick() {
    this.currentDate.subtract(1, 'year');
    this.recalculate();
  }

  onNextMonthClick() {
    this.currentDate.add(1, 'month');
    this.recalculate();
  }

  onPrevMonthClick() {
    this.currentDate.subtract(1, 'month');
    this.recalculate();
  }

  onDayClick(date: moment.Moment): void {
    this.selectedDate = date;
    this.onSelect.emit(date);
    this.visible = false;
  }

  private recalculate() {
    this.currentDay = this.currentDate.date();
    this.currentMonth = this.currentDate.month();
    this.currentYear = this.currentDate.year();

    // start from Monday of first month's week, even it is prev month
    let date = moment(this.currentDate).subtract(this.currentDate.isoWeekday() - 1, 'd');

    this.calendar = [];
    while (true) {
      let week = [];
      while (week.length < 7) {
        week.push(moment(date));
        date.add(1, 'd');
      }
      this.calendar.push(week);

      if (date.month() !== this.currentMonth) {
        break;
      }
    }
  }

}

