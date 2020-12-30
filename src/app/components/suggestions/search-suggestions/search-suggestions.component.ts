import {Component, OnInit} from '@angular/core';
import {DependencyTagDTO} from '../../../model/Tag';
import {BehaviorSubject} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {SuggestionService} from '../../../providers/suggestion.service';
import {KeycloakService} from 'keycloak-angular';
import {DependencyService} from '../../../providers/dependency.service';

@Component({
  selector: 'tmd-search-suggestions',
  templateUrl: './search-suggestions.component.html',
  styleUrls: ['./search-suggestions.component.scss']
})
export class SearchSuggestionsComponent implements OnInit {
  query = new BehaviorSubject('');
  dependencyTags: DependencyTagDTO[];

  constructor(private suggestionService: SuggestionService,
              private keycloakService: KeycloakService,
              private dependencyService: DependencyService) {
  }

  ngOnInit(): void {
    this.query.pipe(
      debounceTime(700),
      switchMap((value: string) => this.suggestionService.getSuggestions(value))
    ).subscribe(result => {
      this.dependencyTags = result;
      console.log(this.dependencyTags);
    });
  }

  queryChange(event: any): void {
    this.query.next(event.target.value);
  }

  like(tag: DependencyTagDTO): void {
    if (tag.vote === 'like') {
      this.suggestionService.removeLike(tag.id).subscribe(newTag => this.replaceTag(newTag));
    } else {
      this.suggestionService.like(tag.id).subscribe(newTag => this.replaceTag(newTag));
    }
  }

  dislike(tag: DependencyTagDTO): void {
    if (tag.vote === 'dislike') {
      this.suggestionService.removeDislike(tag.id).subscribe(newTag => this.replaceTag(newTag));
    } else {
      this.suggestionService.dislike(tag.id).subscribe(newTag => this.replaceTag(newTag));
    }
  }

  private replaceTag(newTag: DependencyTagDTO): void {
    const oldTagIndex = this.dependencyTags.findIndex(tag => tag.id === newTag.id);
    if (oldTagIndex !== -1) {
      this.dependencyTags.splice(oldTagIndex, 1, newTag);
    }
  }

}
