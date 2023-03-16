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
import {W3Component} from './components/w3/w3.component';
import {AccountsPageComponent} from './components/private/accounts-page/accounts-page.component';
import {AccountPageComponent} from './components/private/account-page/account-page.component';

const routes: Routes = [
  {
    path: 'public',
    component: PublicPageComponent,
    children: [
      { path: 'w3', component: W3Component },
      { path: 'login', component: LoginPageComponent },
    ]
  },
  {
    path: 'private',
    component: PrivatePageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'entries', component: EntriesPageComponent },
      { path: 'entries/:code', component: EntriesPageComponent },
      { path: 'entry/:code/:id', component: EntryPageComponent },
      { path: 'entry/:code', component: EntryPageComponent },
      { path: 'accounts', component: AccountsPageComponent },
      { path: 'account', component: AccountPageComponent },
      { path: 'account/:code', component: AccountPageComponent },
      { path: 'categories', component: CategoriesPageComponent },
      { path: 'category', component: CategoryPageComponent },
      { path: 'category/:id', component: CategoryPageComponent },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard'}
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'public/login' }
];

export const Path = {
  login: 'public/login',

  dashboard: '/private/dashboard',

  categories: '/private/categories',
  category: (id: number) => `/private/category/${id ?? ''}`,

  accounts: '/private/accounts',
  account: (code: string) => `/private/account/${code ?? ''}`,

  entries: (code: string) => `/private/entries/${code ?? ''}`,
  entry: (code: string, id?: number) => `/private/entry/${code}/${id ?? ''}`
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
