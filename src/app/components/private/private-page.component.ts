import {Component, ElementRef, ViewChild} from '@angular/core';
import {EntryHttpService} from 'src/app/services/entry.http.service';
import {Path} from 'src/app/app-routing.module';
import {ReportHttpService} from 'src/app/services/report.http.service';
import packageInfo from 'package.json';

@Component({
  selector: 'tm-private-page',
  templateUrl: './private-page.component.html',
  styleUrls: ['./private-page.component.scss']
})
export class PrivatePageComponent {

  readonly Path = Path;
  readonly version = packageInfo.version;

  @ViewChild('overlay') overlay: ElementRef;
  @ViewChild('nav') nav: ElementRef;

  constructor(
    private entryHttpService: EntryHttpService,
    private reportHttpService: ReportHttpService) {
  }

  openMenu(): void {
    if (this.nav.nativeElement.style.display === 'block') {
      this.nav.nativeElement.style.display = 'none';
      this.overlay.nativeElement.style.display = "none";
    } 
    else {
      this.nav.nativeElement.style.display = 'block';
      this.overlay.nativeElement.style.display = "block";
    }
  }

  closeMenu(): void {
    this.nav.nativeElement.style.display = "none";
    this.overlay.nativeElement.style.display = "none";
  }

  updateBalances(): void {
    this.entryHttpService.updateBalances().subscribe(() => window.location.reload());
  }

  generateSummaryPdf(): void {
    this.reportHttpService.generateTable().subscribe(result => {
      const url= window.URL.createObjectURL(result);
      window.open(url);
    });
  }

  generateReportPdf(): void {
    this.reportHttpService.generateReport('2022-01-01', '2022-12-31').subscribe(result => {
      const url= window.URL.createObjectURL(result);
      window.open(url);
    });
  }

}
