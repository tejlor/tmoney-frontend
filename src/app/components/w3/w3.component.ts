import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'tm-w3',
  templateUrl: './w3.component.html',
  styleUrls: ['./w3.component.scss']
})
export class W3Component implements OnInit {

  @ViewChild('myOverlay') myOverlay: ElementRef;
  @ViewChild('mySidebar') mySidebar: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  w3_open() {
    if (this.mySidebar.nativeElement.style.display === 'block') {
      this.mySidebar.nativeElement.style.display = 'none';
      this.myOverlay.nativeElement.style.display = "none";
    } else {
      this.mySidebar.nativeElement.style.display = 'block';
      this.myOverlay.nativeElement.style.display = "block";
    }
  }
  
  // Close the sidebar with the close button
  w3_close() {
    this.mySidebar.nativeElement.style.display = "none";
    this.myOverlay.nativeElement.style.display = "none";
  }

}
