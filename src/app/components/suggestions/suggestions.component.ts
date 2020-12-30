import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'tmd-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {

  tabs = [
    {
      label: 'Search Suggestions',
      route: 'all',
      requiresAuth: false
    },
    {
      label: 'My Private Suggestions',
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
