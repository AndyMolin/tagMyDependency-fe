import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';





@Component({
  selector: 'tmd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class HomeComponent implements OnInit {

  searchForm: FormGroup;

  constructor(  private formBuilder: FormBuilder,
                private router: Router) {

  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      query: ['']
    });
    // this.httpService.get('public/dependency').subscribe(
    //   value => this.test = value,
    //   error => console.log('Error: ' + error));
  }


  // tslint:disable-next-line:typedef
  searchButton() {
    if (this.searchForm.controls.query.value === '') {
      return;
    }
    this.redirectTo('/home', this.searchForm.controls.query.value);
  }

  redirectTo(uri: string, query: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri], {queryParams: {query}}));
    window.scrollTo(0, 0);
  }

}
