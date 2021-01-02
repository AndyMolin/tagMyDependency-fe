import {Component, Input, OnInit} from '@angular/core';
import {DependencyTagDTO, TagDTO} from '../../../model/Tag';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpService} from '../../../providers/http.service';
import {DependencyService} from '../../../providers/dependency.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'tmd-private-tags',
  templateUrl: './private-tags.component.html',
  styleUrls: ['./private-tags.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class PrivateTagsComponent implements OnInit {

  defaultColumns: string[] = ['name', 'deps'];
  tagList: TagDTO[];
  dependencyColumns: string[] = ['name', 'provider', 'actions'];
  dependencyTags: any[] = [];

  // tslint:disable-next-line:variable-name
  private _query: string = null;

  @Input()
  set query(value: string) {
    this._query = value;
    this.updateTags();
  }

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private httpService: HttpService,
              private dependencyService: DependencyService) {
  }

  ngOnInit(): void {
    this.updateTags();
  }

  private updateTags(): void {
    const queryParams: any = {private: true};
    if (this._query) {
      queryParams.query = this._query;
    }
    this.httpService.get(`/public/tag/search`, {
      params: queryParams
    }).subscribe(
      result => {
        this.tagList = result;
      }
    );
  }

  expandElement(element: any): void {
    if (element.isExpanded) {
      element.isExpanded = false;
      return;
    }
    this.tagList.forEach(tag => tag.isExpanded = false);
    this.dependencyTags = element.dependencyTags;
    console.log(this.dependencyTags);
    element.isExpanded = true;
  }

  createSuggestion(dependencyTagDTO: DependencyTagDTO): void {
    this.dependencyService.createSuggestion(dependencyTagDTO.id).subscribe(
      value => console.log('successfully promoted!'),
      err => console.log('Not promoted!'));
    window.location.reload();
  }
}
