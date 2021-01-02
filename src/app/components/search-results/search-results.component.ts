import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../providers/http.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {KeycloakService} from 'keycloak-angular';
import {PageEvent} from '@angular/material/paginator';
import {DependencyService} from '../../providers/dependency.service';


export interface Dependency {
  group_id: string;
  artifact_id: string;
  latest_version: string;
  updated: string;
  extra_content: string;
  isExpanded: boolean;
}

@Component({
  selector: 'tmd-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SearchResultsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private httpService: HttpService,
              private route: ActivatedRoute,
              private keycloakService: KeycloakService,
              private dependencyService: DependencyService) {
  }

  searchForm: FormGroup;
  addTagForm: FormGroup;

  defaultColumns: string[] = ['name', 'latestVersion', 'provider', 'url'];
  displayedColumns: string[] = this.defaultColumns;
  query: string;
  numberOfResults: bigint;
  dependencyList: any[];
  pageSize = 20;
  pageNumber = 0;

  provider = '';

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      query: [''],
    });
    this.addTagForm = this.formBuilder.group({
      tag_name: ['']
    });
    this.route.queryParams.subscribe(params => {
      this.pageSize = params.pageSize || 20;
      this.pageNumber = params.pageNumber || 1;
      this.query = params.query || '';
      this.searchForm.controls.query.setValue(this.query);
      this.searchButton();
    });
    this.keycloakService.isLoggedIn().then(isLoggedin => {
      if (isLoggedin) {
        this.displayedColumns = [...this.defaultColumns, 'add'];
      } else {
        this.displayedColumns = this.defaultColumns;
      }
    });
  }
  // tslint:disable-next-line:typedef
  searchButton() {
    if (this.query.startsWith('provider:')) {
      const splitedQuery = this.query.split(' ');
      this.provider = splitedQuery[0].split(':')[1];
      this.query = splitedQuery[1];
    }

    this.httpService.get(`public/dependency/search?query=${this.query}&providers=${this.provider}&pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`).subscribe(
      value => {
        this.provider = '';
        this.numberOfResults = value.total;
        this.dependencyList = value.elements;
        console.log('total: ' + this.numberOfResults);
        console.log('dependencyList: ' + this.dependencyList.length);
        console.log(this.dependencyList);
      },
      error => console.log(error));
  }

  addTag(element: any): void {
    if (this.addTagForm.controls.tag_name.value === '') {
      return;
    }
    this.httpService.post(`public/tag`, {
      tag: this.addTagForm.controls.tag_name.value,
      dependencyRef: {
        name: element.name,
        provider: element.provider,
        url: element.url
      }
    }).subscribe(() => this.resetAddTagForm(element));
  }

// tslint:disable-next-line:typedef
  redirectTo(uri: string, query: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri], {queryParams: {query}}));
    window.scrollTo(0, 0);
  }

  updateQuery(): void {
    this.pageNumber = 0;
    this.search();
  }

  private search(): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {query: this.searchForm.get('query').value, pageSize: this.pageSize, pageNumber: this.pageNumber},
        queryParamsHandling: 'merge'
      });
  }

  changePage(event: PageEvent): void {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log(event);
    this.search();
  }

  private resetAddTagForm(element: any): void {
    element.isExpanded = false;
    this.addTagForm.controls.tag_name.setValue('');
  }
}
