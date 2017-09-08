import { Component, Input, Output, EventEmitter } from '@angular/core';

/*
  Generated class for the UserListItem component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'user-list-item',
  templateUrl: 'user-list-item.html'
})
export class UserListItemComponent {

  @Input('profile') profile: any;
  @Input('selected') selected: boolean;
  @Input('removable') removable: boolean;
  @Output() userRemove = new EventEmitter();

  constructor() {
  }

  onRemove(){
    console.log("emitting userRemove event");
    this.userRemove.emit({
      profile: this.profile
    });
  }

}
