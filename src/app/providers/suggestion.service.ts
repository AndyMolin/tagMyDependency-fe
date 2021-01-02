import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  constructor(private httpService: HttpService) {
  }

  public getSuggestions(query?: string): Observable<any> {
    let params = {};
    if (query) {
      params = {query};
    }
    return this.httpService.get(`public/tag/suggestion`, {params});
  }

  public like(tagId: string): Observable<any> {
    return this.httpService.put(`public/tag/suggestion/like`, tagId);
  }

  public removeLike(tagId: string): Observable<any> {
    return this.httpService.deleteWithBody(`public/tag/suggestion/like`, tagId);
  }

  public dislike(tagId: string): Observable<any> {
    return this.httpService.put(`public/tag/suggestion/dislike`, tagId);
  }

  public removeDislike(tagId: string): Observable<any> {
    return this.httpService.deleteWithBody(`public/tag/suggestion/dislike`, tagId);
  }

  public getMySuggestions(): Observable<any> {
    return this.httpService.get(`public/tag/suggestion/accepted`);
  }

  public getMyRejectedSuggestions(): Observable<any> {
    return this.httpService.get(`public/tag/suggestion/rejected`);
  }
}
