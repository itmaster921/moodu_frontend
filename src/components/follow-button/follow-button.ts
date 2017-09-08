import { Component, Input, AfterViewChecked } from '@angular/core';
import { UserService } from '../../providers/user-service';
import { UserProfile } from '../../app/user-profile';
import { BackendApiService } from '../../app/backend-api.service';

/*
  Generated class for the FollowButton component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'follow-button',
  templateUrl: 'follow-button.html'
})
export class FollowButtonComponent implements AfterViewChecked{
  following: boolean;
  @Input() currentUser: UserProfile;
  @Input() userProfile: UserProfile;
  loaded: boolean;

  constructor(public backendApiService: BackendApiService,
  private userService: UserService) {
    console.log('Hello FollowButton Component');
    this.loaded = false;
  }

   ngAfterViewChecked(){
    if(this.loaded == false && this.userProfile != undefined){
      this.loaded = true;
      this.loadFollowing();
    }
  }

  loadFollowing(){
    this.backendApiService.follows(this.userProfile.username).subscribe((res)=>{
        this.following = res['follows'];
    },(err)=>{
      console.log("Failed to see if we're following");
    });
  }

  follow(){
    this.backendApiService.follow(this.userProfile.username)
      .subscribe((res)=>{
        this.following = true;
        this.currentUser.following += 1
        this.userProfile.followers += 1
        this.userService.setCurrentUser(this.currentUser);
        this.userService.setProfileUser(this.userProfile);
      }, (err)=>{
        console.log("error following", err);
      });
  }

  unfollow(){
    this.backendApiService.unfollow(this.userProfile.username)
    .subscribe((res)=>{
        this.following = false;
        this.currentUser.following -= 1;
        this.userProfile.followers -= 1;
        this.userService.setProfileUser(this.userProfile);
        this.userService.setCurrentUser(this.currentUser);
      }, (err)=>{
        console.log("error unfollowing", err);
      });

  }
}
