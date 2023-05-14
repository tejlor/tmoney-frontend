import { Component, ElementRef, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import moment from 'moment';
import {ReportHttpService} from 'src/app/services/report.http.service';
import {DATE_FORMAT} from 'src/app/utils/constants';
import {BaseFormComponent} from '../../common/base-form.component';

@Component({
  selector: 'tm-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss']
})
export class ReportPageComponent extends BaseFormComponent implements OnInit {

  readonly DATE_FROM = 'DATE_FROM';
  readonly DATE_TO = 'DATE_TO';

  constructor(el: ElementRef,
              fb: FormBuilder,
              private reportHttpService: ReportHttpService) {

    super(el, fb);

    this.buildForm([
      [this.DATE_FROM, true],
      [this.DATE_TO, true],
    ]);
  }

  ngOnInit(): void {
    const dateFromStr = moment().startOf('year').format(DATE_FORMAT);
    const dateToStr = moment().endOf('year').format(DATE_FORMAT);
    this.control(this.DATE_FROM).setValue(dateFromStr);
    this.control(this.DATE_TO).setValue(dateToStr);
  }

  generateReportPdf(): void {
    if (this.isValid()) {
      const dateFrom = this.controlValue(this.DATE_FROM);
      const dateTo = this.controlValue(this.DATE_TO);
      this.reportHttpService.generateReport(dateFrom, dateTo).subscribe(result => {
        const url= window.URL.createObjectURL(result);
        window.open(url);
      });
    }
  }

}
