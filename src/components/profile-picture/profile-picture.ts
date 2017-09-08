import { Component, Inject } from '@angular/core';
import { UserService } from '../../providers/user-service';
import { UserProfile } from '../../app/user-profile';
import { BACKEND_API_URL } from '../../app/backend-api.service';

/*
  Generated class for the ProfilePicture component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'profile-picture',
  templateUrl: 'profile-picture.html'
})
export class ProfilePictureComponent {
  profilePictureUrl: string;

  constructor(public userService: UserService,
  @Inject(BACKEND_API_URL) public apiUrl: string) {
    userService.currentUser.subscribe((userProfile: UserProfile) => {
      console.log("in component ProfilePictureComponent setting profile picture to ", userProfile.profile_picture);
      this.profilePictureUrl = userProfile.profile_picture;
    });
  }

}
