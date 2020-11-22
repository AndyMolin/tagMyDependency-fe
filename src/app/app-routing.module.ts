import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchResultsComponent} from './components/search-results/search-results.component';
import {ViewTagComponent} from './components/view-tag/view-tag.component';

const routes: Routes = [
  {path: 'results', component: SearchResultsComponent},
  // { path: 'home', component: HomeComponent},
  // { path: 'profile', component: ProfileComponent},
  {path: 'view-tags', component: ViewTagComponent},
  {path: '**', redirectTo: 'results'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const appRoutingModule = RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'});
