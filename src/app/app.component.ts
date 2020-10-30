import {Component, OnInit} from '@angular/core';
import {HttpService} from './providers/http.service';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'tmd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'tag-my-dependency-fe';

  constructor(private httpService: HttpService,
              private keycloakService: KeycloakService) {
  }

  ngOnInit(): void {
    this.httpService.get('demo').subscribe(value => this.title = value.greeting);
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
