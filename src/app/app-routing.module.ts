import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchResultsComponent} from './components/search-results/search-results.component';
import {TagsComponent} from './components/tags/tags.component';
import {AuthGuard} from './providers/auth-guard.service';
import {SearchTagsComponent} from './components/tags/search-tags/search-tags.component';
import {PrivateTagsComponent} from './components/tags/private-tags/private-tags.component';
import {MySuggestionsComponent} from './components/suggestions/my-suggestions/my-suggestions.component';
import {SearchSuggestionsComponent} from './components/suggestions/search-suggestions/search-suggestions.component';
import {SuggestionsComponent} from './components/suggestions/suggestions.component';

const routes: Routes = [
  {path: 'results', component: SearchResultsComponent},
  // { path: 'home', component: HomeComponent},
  // { path: 'profile', component: ProfileComponent},
  {
    path: 'tags', component: TagsComponent, children: [
      {path: 'search', component: SearchTagsComponent},
      {path: 'private', component: PrivateTagsComponent, canActivate: [AuthGuard]},
      {path: '**', redirectTo: 'search'},
    ]
  },
  {
    path: 'suggestions', component: SuggestionsComponent, children: [
      {path: 'all', component: SearchSuggestionsComponent},
      {path: 'private', component: MySuggestionsComponent, canActivate: [AuthGuard]},
      {path: '**', redirectTo: 'all'},
    ]
  },
  {path: '**', redirectTo: 'results'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const appRoutingModule = RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'});
