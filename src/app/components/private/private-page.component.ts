import {Component, ElementRef, ViewChild} from '@angular/core';
import {EntryHttpService} from 'src/app/services/entry.http.service';
import {Path} from 'src/app/app-routing.module';

@Component({
  selector: 'tm-private-page',
  templateUrl: './private-page.component.html',
  styleUrls: ['./private-page.component.scss']
})
export class PrivatePageComponent {

  readonly Path = Path;

  @ViewChild('myOverlay') myOverlay: ElementRef;
  @ViewChild('mySidebar') mySidebar: ElementRef;

  constructor(
    private entryHttpService: EntryHttpService) {
  }

  w3_open(): void {
    if (this.mySidebar.nativeElement.style.display === 'block') {
      this.mySidebar.nativeElement.style.display = 'none';
      this.myOverlay.nativeElement.style.display = "none";
    } else {
      this.mySidebar.nativeElement.style.display = 'block';
      this.myOverlay.nativeElement.style.display = "block";
    }
  }

  w3_close(): void {
    this.mySidebar.nativeElement.style.display = "none";
    this.myOverlay.nativeElement.style.display = "none";
  }

  updateBalances():void {
    this.entryHttpService.updateBalances().subscribe(() => window.location.reload());
  }

}
