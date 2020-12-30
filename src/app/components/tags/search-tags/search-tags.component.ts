import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'tmd-search-tags',
  templateUrl: './search-tags.component.html',
  styleUrls: ['./search-tags.component.scss']
})
export class SearchTagsComponent implements OnInit {
  query: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
