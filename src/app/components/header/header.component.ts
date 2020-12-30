import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'tmd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  @Output() public sidenavToggle = new EventEmitter();

  constructor(private keycloakService: KeycloakService) { }

  ngOnInit(): void {
    this.keycloakService.isLoggedIn().then(console.log);

  }


  logout(): void {
    this.keycloakService.logout().then(value => console.log('logged out'));
  }

  /*profile(): void {
    window.open(this.keycloakService.getKeycloakInstance().createAccountUrl(), '_blank');
  }*/

  login(): void {
    this.keycloakService.login();
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  public isLoggedIn(): boolean {
    return this.keycloakService.getKeycloakInstance().authenticated;
  }

}
