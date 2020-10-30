// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {KeycloakConfig, KeycloakInitOptions} from 'keycloak-js';
import {KeycloakOptions} from 'keycloak-angular';

const keycloakConfig: KeycloakConfig = {
  url: 'https://id.cadeca.ro/auth',
  realm: 'tag-my-dependency-local',
  clientId: 'tag-my-dependency-fe'
};

const keycloakInitOptions: KeycloakInitOptions = {
  // onLoad: 'login-required',
  // checkLoginIframe: false,
  pkceMethod: 'S256'
};

const keycloakOptions: KeycloakOptions = {
  config: keycloakConfig,
  initOptions: keycloakInitOptions,
  enableBearerInterceptor: true,
  loadUserProfileAtStartUp: true
};


export const environment = {
  production: false,
  apiUrl: 'http://localhost:7070/api',
  keycloakOptions
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
