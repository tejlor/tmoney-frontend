import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import * as moment from 'moment';
import '@angular/common/locales/global/pl';
import 'moment/locale/pl';
import {DashboardPageComponent} from './components/private/dashboard-page/dashboard-page.component';
import {W3Component} from './components/w3/w3.component';
import {DashboardPanelComponent} from './components/private/dashboard-page/panel/panel.component';
import {EntriesPageComponent} from './components/private/entries-page/entries-page.component';
import {EntryPageComponent} from './components/private/entry-page/entry-page.component';
import {ChartPageComponent} from './components/private/chart-page/chart-page.component';
import {ReportPageComponent} from './components/private/report-page/report-page.component';
import {PaginationComponent} from './components/private/entries-page/pagination/pagination.component';
import {FilterComponent} from './components/private/entries-page/filter/filter.component';
import {ReactiveFormsModule} from '@angular/forms';
import {InputTextComponent} from './components/common/form/input-text/input-text.component';
import {InputDateComponent} from './components/common/form/input-date/input-date.component';
import {TextareaComponent} from './components/common/form/textarea/textarea.component';
import {SelectComponent} from './components/common/form/select/select.component';
import {DialogComponent} from './components/common/dialog/dialog.component';
import {CategoriesPageComponent} from './components/private/categories-page/categories-page.component';
import {CategoryPageComponent} from './components/private/category-page/category-page.component';
import {InputRadioComponent} from './components/common/form/input-radio/input-radio.component';
import {OAuthService} from './services/oauth.service';
import {environment} from 'src/environments/environment';
import {LoginPageComponent} from './components/public/login-page/login-page.component';
import {PublicPageComponent} from './components/public/public-page.component';
import {PrivatePageComponent} from './components/private/private-page.component';
import {InputPasswordComponent} from './components/common/form/input-pass/input-pass.component';
import {CategoryDeleteDialogComponent} from './components/private/categories-page/delete-dialog/delete-dialog.component';
import {AccountSummaryComponent} from './components/common/panel/account-summary/summary.component';
import {OAuthInterceptor} from './config/auth.interceptor';
import {ErrorHandlerInterceptor} from './config/error-handler.interceptor';
import {YesNoIconComponent} from './components/common/control/yes-no-icon/yes-no-icon.component';
import {AccountBadgesComponent} from './components/common/control/account-badges/account-badges.component';
import {DatepickerComponent} from './components/common/control/datepicker/datepicker.component';
import {DatepickerDirective} from './components/common/directive/datepicker.directive';
import {InputNumberComponent} from './components/common/form/input-number/input-number.component';
import {DecimalDirective} from './components/common/directive/decimal.directive';
import {InputRadioGroupComponent} from './components/common/form/input-radio-group/input-radio-group.component';
import {AccountPageComponent} from './components/private/account-page/account-page.component';
import {AccountsPageComponent} from './components/private/accounts-page/accounts-page.component';
import {AccountColorsComponent} from './components/common/control/account-colors/account-colors.component';
import {FaIconComponent} from './components/common/control/fa-icon/fa-icon.component';
import {InputCheckComponent} from './components/common/form/input-check/input-check.component';
import {InputColorComponent} from './components/common/form/input-color/input-color.component';
import {InputIconComponent} from './components/common/form/input-icon/input-icon.component';
import {InputFileComponent} from './components/common/form/input-file/input-file.component';
import {FileValueAccessor} from './components/common/form/input-file/input-file.directive';


function init(oauthService: OAuthService): () => Promise<void> {
  moment.locale('pl');

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
    DashboardPanelComponent,
    EntriesPageComponent,
    EntryPageComponent,
    ChartPageComponent,
    ReportPageComponent,
    PaginationComponent,
    FilterComponent,
    InputTextComponent,
    InputPasswordComponent,
    InputDateComponent,
    InputNumberComponent,
    InputRadioGroupComponent,
    TextareaComponent,
    SelectComponent,
    InputRadioComponent,
    DialogComponent,
    CategoriesPageComponent,
    CategoryPageComponent,
    LoginPageComponent,
    PublicPageComponent,
    PrivatePageComponent,
    CategoryDeleteDialogComponent,
    AccountSummaryComponent,
    YesNoIconComponent,
    AccountBadgesComponent,
    DatepickerComponent,
    DatepickerDirective,
    DecimalDirective,
    AccountPageComponent,
    AccountsPageComponent,
    AccountColorsComponent,
    FaIconComponent,
    InputCheckComponent,
    InputColorComponent,
    InputIconComponent,
    InputFileComponent,
    FileValueAccessor
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pl-PL'},
    {provide: APP_INITIALIZER, useFactory: init, deps: [OAuthService], multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: OAuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
