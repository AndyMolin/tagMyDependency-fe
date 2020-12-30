import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {environment} from '../environments/environment';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AuthGuard} from './providers/auth-guard.service';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './components/header/header.component';
import {SearchResultsComponent} from './components/search-results/search-results.component';
import {HomeComponent} from './components/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {CollapseContentDirective, CollapseDirective, CollapseItemDirective} from './collapse.directive';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ProfileComponent} from './components/profile/profile.component';
import {SidenavListComponent} from './components/sidenav-list/sidenav-list.component';
import {MatListModule} from '@angular/material/list';
import {ViewTagComponent} from './components/tags/view-tag/view-tag.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {TagsComponent} from './components/tags/tags.component';
import { MySuggestionsComponent } from './components/suggestions/my-suggestions/my-suggestions.component';
import { SearchTagsComponent } from './components/tags/search-tags/search-tags.component';
import { PrivateTagsComponent } from './components/tags/private-tags/private-tags.component';
import { SuggestionsComponent } from './components/suggestions/suggestions.component';
import { SearchSuggestionsComponent } from './components/suggestions/search-suggestions/search-suggestions.component';
import {MatCardModule} from '@angular/material/card';

export function kcInitializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init(environment.keycloakOptions);
        console.log('Keycloak is initialized');
        resolve();
      } catch (error) {
        console.log('Error thrown in init ' + error);
        reject(error);
      }
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchResultsComponent,
    HomeComponent,
    CollapseDirective,
    CollapseContentDirective,
    CollapseItemDirective,
    ProfileComponent,
    SidenavListComponent,
    ViewTagComponent,
    TagsComponent,
    MySuggestionsComponent,
    SearchTagsComponent,
    PrivateTagsComponent,
    SuggestionsComponent,
    SearchSuggestionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatTabsModule,
    MatCardModule,
    MatTooltipModule,
    FormsModule,
  ],
  providers: [
    AuthGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: APP_INITIALIZER, useFactory: kcInitializer, multi: true, deps: [KeycloakService]},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
