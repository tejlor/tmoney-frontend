import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {CategoriesPageComponent} from './components/private/categories-page/categories-page.component';
import {CategoryPageComponent} from './components/private/category-page/category-page.component';
import {DashboardPageComponent} from './components/private/dashboard-page/dashboard-page.component';
import {EntryPageComponent} from './components/private/entry-page/entry-page.component';
import {LoginPageComponent} from './components/public/login-page/login-page.component';
import {PrivatePageComponent} from './components/private/private-page.component';
import {PublicPageComponent} from './components/public/public-page.component';
import {EntriesPageComponent} from './components/private/entries-page/entries-page.component';
import {AccountsPageComponent} from './components/private/accounts-page/accounts-page.component';
import {AccountPageComponent} from './components/private/account-page/account-page.component';
import {AccountBalancingPageComponent} from './components/private/account-balancing-page/account-balancing-page.component';
import {TransferDefinitionsPageComponent} from './components/private/transfer-definitions-page/transfer-definitions-page.component';
import {TransferDefinitionPageComponent} from './components/private/transfer-definition-page/transfer-definition-page.component';
import {TransferPageComponent} from './components/private/transfer-page/transfer-page.component';
import {ReportPageComponent} from './components/private/report-page/report-page.component';

const routes: Routes = [
  {
    path: 'public',
    component: PublicPageComponent,
    children: [
      { path: 'login', component: LoginPageComponent },
    ]
  },
  {
    path: 'private',
    component: PrivatePageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'accounts', component: AccountsPageComponent },
      { path: 'account', component: AccountPageComponent },
      { path: 'account/:code', component: AccountPageComponent },
      { path: 'account/:code/balancing', component: AccountBalancingPageComponent },
      { path: 'categories', component: CategoriesPageComponent },
      { path: 'category', component: CategoryPageComponent },
      { path: 'category/:id', component: CategoryPageComponent },
      { path: 'entries', component: EntriesPageComponent },
      { path: 'entries/:accountCode', component: EntriesPageComponent },
      { path: 'entry/:accountCode/:id', component: EntryPageComponent },
      { path: 'entry/:accountCode', component: EntryPageComponent },
      { path: 'transfer/:definitionId', component: TransferPageComponent },
      { path: 'transfer-definitions', component: TransferDefinitionsPageComponent },
      { path: 'transfer-definition', component: TransferDefinitionPageComponent },
      { path: 'transfer-definition/:id', component: TransferDefinitionPageComponent },
      { path: 'report', component: ReportPageComponent },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard'}
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'public/login' }
];

export const Path = {
  login: () => 'public/login',

  dashboard: () => '/private/dashboard',

  accounts: () => '/private/accounts',
  account: (code?: string) => `/private/account/${code ?? ''}`,
  accountBalancing: (code: string) => `/private/account/${code}/balancing`,

  categories: () => '/private/categories',
  category: (id?: number) => `/private/category/${id ?? ''}`,

  entries: (accountCode: string) => `/private/entries/${accountCode ?? ''}`,
  entry: (accountCode: string, id?: number) => `/private/entry/${accountCode}/${id ?? ''}`,

  transfer: (definitionId: number) => `/private/transfer/${definitionId}`,

  transferDefinitions: () => '/private/transfer-definitions',
  transferDefinition: (id?: number) => `/private/transfer-definition/${id ?? ''}`,

  report: () => '/private/report',

  params: {
    id: 'id',
    code: 'code',
    accountCode: 'accountCode',
    definitionId: 'definitionId'
  }
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
