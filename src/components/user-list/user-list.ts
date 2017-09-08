import { Component, Input, EventEmitter, Output } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'user-list',
  templateUrl: 'user-list.html'
})
export class UserListComponent {
  // Songs to display in the list
  @Input('profiles') profiles: any[];
  // Whether or not to show a checkmark when clicked
  @Input('selectable') selectable: boolean;
  // whether or not to show an "x" to remove item from list
  @Input('removable') removable: boolean;
  /* profiles that have been selected
  * Used for tracking which songs to mark as selected
  * When display search results.
  */
  @Input('selectedProfiles') selectedProfiles: any[];
  // Boolean to call disable what happens when an element is clicked.
  @Input('onClickOverride') onClickOverride: boolean;

  @Output('onUserItemClick') onUserItemClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.selectedProfiles = this.selectedProfiles || new Array();
  }

  clickedOnProfile(profile: any, event): void {
    this.onUserItemClick.next({'profile': profile});
    if(this.onClickOverride){
      return;
    }
    //Check if the event target is the close button or not.
    if(event.target.className.indexOf('remove-button') > -1){
      this.removeProfile(profile);
      return;
    }
    if(this.selectable != true){
      return;
    }
    if (this.isSelected(profile)) {
      this.deselectProfile(profile);
    }
    else{
      this.selectProfile(profile);
    }  
  }

  isSelected(profile: any):any {
    let idx = _.findIndex(this.selectedProfiles, function(o) { return o.id == profile.id; });
    return idx !== -1;
  }

  selectProfile(profile: any):void{
    this.selectedProfiles.push(profile);
    
  }

  deselectProfile(profile: any):void{
    let idx = _.findIndex(this.selectedProfiles, function(o) { return o.id == profile.id; });
    this.selectedProfiles.splice(idx, 1);


  }

  removeProfile(profile: any):void{
    let idx = _.findIndex(this.profiles, function(o) { return o.id == profile.id; });
    this.profiles.splice(idx, 1);
  }

  removeFired(event){
    this.removeProfile(event.profile);
  }

}
