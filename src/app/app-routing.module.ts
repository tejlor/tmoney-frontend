import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardPageComponent} from './components/dashboard-page/dashboard-page.component';
import {EntryPageComponent} from './components/entry-page/entry-page.component';
import {TablePageComponent} from './components/table-page/table-page.component';
import {W3Component} from './components/w3/w3.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardPageComponent},
  {path: 'table/:code', component: TablePageComponent},
  {path: 'entry/:code/:id', component: EntryPageComponent},
  {path: 'entry/:code', component: EntryPageComponent},
  {path: 'w3', component: W3Component},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
