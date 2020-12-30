import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'tmd-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tabs = [
    {
      label: 'Search Tags',
      route: 'search',
      requiresAuth: false
    },
    {
      label: 'My Private Tags',
      route: 'private',
      requiresAuth: true
    }
  ];
  visibleTabs: any[];

  constructor(private activatedRoute: ActivatedRoute,
              private keycloakService: KeycloakService) {
  }

  ngOnInit(): void {
    this.visibleTabs = this.tabs
      .filter(tab => !tab.requiresAuth || (tab.requiresAuth && this.keycloakService.getKeycloakInstance().authenticated));
  }

}
