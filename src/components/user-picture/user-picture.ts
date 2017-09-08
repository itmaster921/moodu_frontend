import { Component, Input, Inject } from '@angular/core';

import { BACKEND_API_URL } from '../../app/backend-api.service';
/*
  Generated class for the UserPicture component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'user-picture',
  templateUrl: 'user-picture.html'
})
export class UserPictureComponent {
  @Input() pictureUrl: string;

  constructor(@Inject(BACKEND_API_URL) public apiUrl: string) {
    console.log('Hello UserPicture Component');
  }

}
