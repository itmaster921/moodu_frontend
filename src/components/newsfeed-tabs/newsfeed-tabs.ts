import { Component } from '@angular/core';

/*
  Generated class for the NewsfeedTabs component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'newsfeed-tabs',
  templateUrl: 'newsfeed-tabs.html'
})
export class NewsfeedTabsComponent {

  text: string;

  constructor() {
    console.log('Hello NewsfeedTabs Component');
    this.text = 'Hello World';
  }

}
