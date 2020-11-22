import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchResultsComponent} from './components/search-results/search-results.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'results', component: SearchResultsComponent},
  { path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const appRoutingModule = RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'});
