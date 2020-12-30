import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DependencyService {

  constructor(private httpService: HttpService) {
  }

  private dependencyProviderPictureMap = {
    maven: '../../../assets/images/logos/maven-logo.png',
    pypi: '../../../assets/images/logos/python-logo.png',
    npm: '../../../assets/images/logos/npm-logo.png'
  };


  public getImageForDependencyProvider(provider: string): string {
    return this.dependencyProviderPictureMap[provider.toLowerCase()];
  }

  public createSuggestion(tagId: string): Observable<any> {
    return this.httpService.post(`/public/tag/suggestion`, tagId);
  }
}
