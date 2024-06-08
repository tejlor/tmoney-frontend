import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import * as moment from 'moment';
import '@angular/common/locales/global/pl';
import 'moment/locale/pl';
import {DashboardPageComponent} from './components/private/dashboard-page/dashboard-page.component';
import {DashboardPanelComponent} from './components/private/dashboard-page/panel/panel.component';
import {EntriesPageComponent} from './components/private/entries-page/entries-page.component';
import {EntryPageComponent} from './components/private/entry-page/entry-page.component';
import {ReportPageComponent} from './components/private/report-page/report-page.component';
import {PaginationComponent} from './components/common/control/pagination/pagination.component';
import {FilterComponent} from './components/common/control/filter/filter.component';
import {ReactiveFormsModule} from '@angular/forms';
import {InputTextComponent} from './components/common/form/input-text/input-text.component';
import {InputDateComponent} from './components/common/form/input-date/input-date.component';
import {TextareaComponent} from './components/common/form/textarea/textarea.component';
import {SelectComponent} from './components/common/form/select/select.component';
import {DialogComponent} from './components/common/dialog/dialog.component';
import {CategoriesPageComponent} from './components/private/categories-page/categories-page.component';
import {CategoryPageComponent} from './components/private/category-page/category-page.component';
import {InputRadioComponent} from './components/common/form/input-radio-group/input-radio/input-radio.component';
import {OAuthService} from './services/oauth.service';
import {environment} from 'src/environments/environment';
import {LoginPageComponent} from './components/public/login-page/login-page.component';
import {PublicPageComponent} from './components/public/public-page.component';
import {PrivatePageComponent} from './components/private/private-page.component';
import {InputPasswordComponent} from './components/common/form/input-pass/input-pass.component';
import {CategoryDeleteDialogComponent} from './components/private/categories-page/delete-dialog/delete-dialog.component';
import {AccountSummaryComponent} from './components/private/_common/account-summary/summary.component';
import {OAuthInterceptor} from './config/auth.interceptor';
import {ErrorHandlerInterceptor} from './config/error-handler.interceptor';
import {YesNoIconComponent} from './components/common/control/yes-no-icon/yes-no-icon.component';
import {AccountBadgesComponent} from './components/private/_common/account-badges/account-badges.component';
import {DatePickerComponent} from './components/common/control/date-picker/date-picker.component';
import {DatePickerDirective} from './components/common/control/date-picker/date-picker.directive';
import {InputNumberComponent} from './components/common/form/input-number/input-number.component';
import {DecimalDirective} from './components/common/directive/decimal.directive';
import {InputRadioGroupComponent} from './components/common/form/input-radio-group/input-radio-group.component';
import {AccountPageComponent} from './components/private/account-page/account-page.component';
import {AccountsPageComponent} from './components/private/accounts-page/accounts-page.component';
import {AccountColorsComponent} from './components/private/accounts-page/account-colors/account-colors.component';
import {InputColorComponent} from './components/common/form/input-color/input-color.component';
import {InputIconComponent} from './components/common/form/input-icon/input-icon.component';
import {InputImageComponent} from './components/common/form/input-image/input-image.component';
import {FileValueAccessor} from './components/common/directive/input-file.directive';
import {AccountBalancingPageComponent} from './components/private/account-balancing-page/account-balancing-page.component';
import {TransferDefinitionPageComponent} from './components/private/transfer-definition-page/transfer-definition-page.component';
import {TransferDefinitionsPageComponent} from './components/private/transfer-definitions-page/transfer-definitions-page.component';
import {TransferPageComponent} from './components/private/transfer-page/transfer-page.component';
import {TaggedTextareaComponent} from './components/private/_common/tagged-description/tagged-textarea.component';
import {TransactionsImportDialogComponent} from './components/private/dashboard-page/panel/import-dialog/import-dialog.component';
import {InputFileComponent} from './components/common/form/input-file/input-file.component';
import {UppercaseDirective} from './components/common/directive/uppercase.directive';


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
    DashboardPanelComponent,
    EntriesPageComponent,
    EntryPageComponent,
    ReportPageComponent,
    PaginationComponent,
    FilterComponent,
    InputTextComponent,
    InputPasswordComponent,
    InputDateComponent,
    InputNumberComponent,
    InputRadioGroupComponent,
    TextareaComponent,
    TaggedTextareaComponent,
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
    DatePickerComponent,
    DatePickerDirective,
    DecimalDirective,
    AccountPageComponent,
    AccountsPageComponent,
    AccountColorsComponent,
    InputColorComponent,
    InputIconComponent,
    InputImageComponent,
    FileValueAccessor,
    AccountBalancingPageComponent,
    TransferDefinitionPageComponent,
    TransferDefinitionsPageComponent,
    TransferPageComponent,
    TransactionsImportDialogComponent,
    InputFileComponent,
    UppercaseDirective
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
