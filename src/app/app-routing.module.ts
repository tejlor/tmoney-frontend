import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { W3Component } from './components/w3/w3.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'w3', component: W3Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
