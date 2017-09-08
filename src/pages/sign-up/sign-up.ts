import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BackendApiService } from '../../app/backend-api.service';
import { UserService } from '../../providers/user-service';
import { UserProfile } from '../../app/user-profile';
import { TabsPage } from '../tabs/tabs';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {
  spotifyUser: any;
  authForm: FormGroup;

  constructor(public navCtrl: NavController, 
      public params: NavParams, 
      fb: FormBuilder,
      private backendApiService : BackendApiService,
      private userService: UserService
      ) {
    this.spotifyUser = params['data'];
    let displayName: string = this.spotifyUser['display_name'];
    this.authForm = fb.group({
      'spotifyId': [this.spotifyUser['id']],
      'accessToken': [window.localStorage.getItem('spotify_access_token')],
      'firstName': [this.getFirstName(displayName), Validators.required],
      'lastName': [this.getLastName(displayName), Validators.required],
      'email': [this.spotifyUser['email'], Validators.required],
      'birthday': [this.spotifyUser['birthdate'], Validators.required],
      'gender': ['M', Validators.required],
      'location': [this.spotifyUser['country'], Validators.required]
    });
    console.log(JSON.stringify(params));
  }

  onSubmit(value: string): void {
    console.log('you submitted value: ', JSON.stringify(value));
    this.backendApiService.registerUser(value).subscribe((res)=>{
      this.getUserInfoAndGoToProfilePage();
    }, (err)=>{});
  }

  getUserInfoAndGoToProfilePage(){
    this.backendApiService.getUser(this.spotifyUser['id'])
        .subscribe( 
          res => {
              this.userService.setCurrentUser(res);
              this.goToProfilePage(res);
            
          },
          err => {
            console.log("There was an error getting user by spotify Id", JSON.stringify(err)); 

          });
  }

  goToProfilePage(userProfile: UserProfile){
     console.log("Navigating to profile:", JSON.stringify(userProfile));
     this.navCtrl.setRoot(TabsPage);
  }

  getFirstName(fullName: string): string{
    let firstName: string = '';
    fullName == fullName || '';
    if(fullName && fullName.length > 0){
      let nameArray: string[] = fullName.split(' ') || [];
      if(nameArray && nameArray.length > 1){
        firstName = nameArray.slice(0, nameArray.length).join(' ');
      }
      return nameArray[0];
    }
    return firstName
  }

  getLastName(fullName: string): string{
    fullName = fullName || '';
    let lastName: string = '';
    if(fullName && fullName.length > 0){
      let nameArray: string[] = fullName.split(' ') || [];
      if(nameArray.length > 1){
        lastName = nameArray[nameArray.length - 1];
      }
    }
    return lastName
  }
}

