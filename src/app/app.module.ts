import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { W3Component } from './components/w3/w3.component';
import { BlockComponent } from './components/dashboard-page/block/block.component';
import '@angular/common/locales/global/pl';
import { TablePageComponent } from './components/table-page/table-page.component';
import { EntryPageComponent } from './components/entry-page/entry-page.component';
import { ChartPageComponent } from './components/chart-page/chart-page.component';
import { ReportPageComponent } from './components/report-page/report-page.component';
import { PaginationComponent } from './components/table-page/pagination/pagination.component';
import { FilterComponent } from './components/table-page/filter/filter.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    W3Component,
    BlockComponent,
    TablePageComponent,
    EntryPageComponent,
    ChartPageComponent,
    ReportPageComponent,
    PaginationComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pl-PL' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
