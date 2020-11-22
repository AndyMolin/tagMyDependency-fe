import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../providers/http.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'tmd-view-tag',
  templateUrl: './view-tag.component.html',
  styleUrls: ['./view-tag.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ViewTagComponent implements OnInit {

  defaultColumns: string[] = ['name'];
  tagList: any[];
  dependencyColumns: string[] = ['name', 'provider', 'url'];
  dependencyList: any[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private httpService: HttpService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.httpService.get('/public/tag/search').subscribe(
      result => this.tagList = result.map(name => {
        return {
          name
        };
      })
    );
  }

  getDependencies(element: any): void {
    if (element.isExpanded) {
      element.isExpanded = false;
      return;
    }
    this.tagList.forEach(tag => tag.isExpanded = false);
    this.httpService.get(`public/tag?tag=${element.name}`).subscribe(result => this.dependencyList = result);
    element.isExpanded = true;
  }
}
