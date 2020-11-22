import { Component, OnInit } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;

  constructor(private keycloakService: KeycloakService) { }

  ngOnInit(): void {
  }


  logout(): void {
    this.keycloakService.logout().then(value => console.log('logged out'));
  }

  profile(): void {
    window.open(this.keycloakService.getKeycloakInstance().createAccountUrl(), '_blank');
  }

  login(): void {
    this.keycloakService.login();
  }

}
