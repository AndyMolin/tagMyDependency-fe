import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpService} from '../../providers/http.service';
import { animate, state, style, transition, trigger } from '@angular/animations';


export interface Dependency {
  group_id: string;
  artifact_id: string;
  latest_version: string;
  updated: string;
  extra_content: string;
  isExpanded: boolean;
}

const ELEMENT_DATA: Dependency[] = [
  {group_id: 'io.github.jzdayz', artifact_id: 'light-rpc-spring-boot', latest_version: '6.0.0', updated: '25-Feb-2020', extra_content: 'test', isExpanded: false},
  {group_id: 'io.github.jzdayz', artifact_id: 'light-rpc-spring', latest_version: '6.0.0', updated: '25-Feb-2020', extra_content: 'test', isExpanded: false},
  {group_id: 'io.github.jzdayz', artifact_id: 'light-rpc', latest_version: '6.0.0', updated: '25-Feb-2020', extra_content: 'test', isExpanded: false},
  {group_id: 'io.github.jzdayz', artifact_id: 'b', latest_version: '4.0', updated: '18-Feb-2020', extra_content: 'test', isExpanded: false},
  {group_id: 'io.github.jzdayz', artifact_id: 'a', latest_version: '4.0', updated: '18-Feb-2020', extra_content: 'test', isExpanded: false}
];

@Component({
  selector: 'tmd-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SearchResultsComponent implements OnInit {

  searchForm: FormGroup;

  displayedColumns: string[] = ['group_id', 'artifact_id', 'latest_version', 'updated', 'add'];
  dataSource = ELEMENT_DATA;
  test: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private httpService: HttpService) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      query: ['']
    });
    // this.httpService.get('public/dependency').subscribe(
    //   value => this.test = value,
    //   error => console.log('Error: ' + error));
  }

  // tslint:disable-next-line:typedef
  searchButton() {
    if (this.searchForm.controls.query.value === '') {
      return;
    }
    this.redirectTo('/results', this.searchForm.controls.query.value);
  }

  // tslint:disable-next-line:typedef
  redirectTo(uri: string, query: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri], {queryParams: {query}}));
    window.scrollTo(0, 0);
  }

}
