import { Component } from '@angular/core';

/*
  Generated class for the UserListSummary component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'user-list-summary',
  templateUrl: 'user-list-summary.html'
})
export class UserListSummaryComponent {

  text: string;

  constructor() {
    console.log('Hello UserListSummary Component');
    this.text = 'Hello World';
  }

}
