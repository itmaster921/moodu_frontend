import { Component, Input } from '@angular/core';
import { UserProfile } from '../../app/user-profile'

import { UserService } from '../../providers/user-service';

/*
  Generated class for the UserProfileFollowerInfo component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'user-profile-follower-info',
  templateUrl: 'user-profile-follower-info.html'
})
export class UserProfileFollowerInfoComponent {
  @Input() userProfile: UserProfile;

  constructor(public userService: UserService) {
    console.log('Hello UserProfileFollowerInfo Component');
  }

}
