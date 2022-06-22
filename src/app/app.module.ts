import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/common/form/input-text/input-text.component';
import { InputDateComponent } from './components/common/form/input-date/input-date.component';
import { TextareaComponent } from './components/common/form/textarea/textarea.component';
import { SelectComponent } from './components/common/form/select/select.component';
import { DialogComponent } from './components/common/dialog/dialog.component';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import {InputRadioComponent} from './components/common/form/input-radio/input-radio.component';
import {OAuthService} from './services/oauth.service';
import {environment} from 'src/environments/environment';


function init(oauthService: OAuthService): () => Promise<void> {
  return () => new Promise<void>((resolve) => {
    setInterval(() => oauthService.refreshToken(), environment.refreshInterval);
    resolve();
  });
}

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
    FilterComponent,
    InputComponent,
    InputDateComponent,
    TextareaComponent,
    SelectComponent,
    InputRadioComponent,
    DialogComponent,
    CategoriesPageComponent,
    CategoryPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pl-PL'
    },
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      deps: [OAuthService],
      multi: true
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
