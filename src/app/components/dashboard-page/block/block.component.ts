import { Component, Input, OnInit } from '@angular/core';
import { Route, Router, ROUTER_CONFIGURATION } from '@angular/router';
import { Account } from 'src/app/model/account';
import { Entry } from 'src/app/model/entry';

@Component({
  selector: 'tm-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {

  @Input() account: Account;
  @Input() entry: Entry;

  constructor() { }

  ngOnInit(): void {
  }

}
