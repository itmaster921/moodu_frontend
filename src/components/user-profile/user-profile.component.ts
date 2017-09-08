import { Component, Input, Inject, OnInit, SimpleChange } from '@angular/core';
import { UserProfile } from '../../app/user-profile';
import { BackendApiService, BACKEND_API_URL } from '../../app/backend-api.service';
import { UserService } from '../../providers/user-service';
      

/*
  Generated class for the UserProfile component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfileComponent implements OnInit{

  @Input() currentUser: UserProfile;
  @Input() userProfile: UserProfile;
  
  constructor(public backendApiService: BackendApiService,
  @Inject(BACKEND_API_URL) public apiUrl: string,
  private userService: UserService) {
    console.log('Hello UserProfile Constructor');
  }

  ngOnInit(): void {
  }

  ionViewWillEnter(){
    console.log("in ionViewWillEnter of user-profile.component");
  }
  
  ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
   console.log('Changes', changes);
  }

}
