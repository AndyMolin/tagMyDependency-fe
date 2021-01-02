import {Component, OnInit} from '@angular/core';
import {SuggestionService} from '../../../providers/suggestion.service';
import {DependencyTagDTO} from '../../../model/Tag';

@Component({
  selector: 'tmd-my-suggestions',
  templateUrl: './my-suggestions.component.html',
  styleUrls: ['./my-suggestions.component.scss']
})
export class MySuggestionsComponent implements OnInit {
  acceptedSuggestions: DependencyTagDTO[];
  rejectedSuggestions: DependencyTagDTO[];

  constructor(private suggestionService: SuggestionService) {
  }

  ngOnInit(): void {

    this.suggestionService.getMySuggestions().subscribe(result => this.acceptedSuggestions = result);
    this.suggestionService.getMyRejectedSuggestions().subscribe(result => this.rejectedSuggestions = result);
  }

}
