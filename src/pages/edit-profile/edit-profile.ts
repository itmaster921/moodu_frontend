import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { BackendApiService } from '../../app/backend-api.service';
import { UserProfile } from '../../app/user-profile';
import { UnicodeNamePipe } from '../../pipes/unicode-name-pipe';
import { UserService } from '../../providers/user-service';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditProfilePage {
  user: UserProfile;
  authForm: FormGroup;

  constructor(public navCtrl: NavController, 
      public params: NavParams, 
      public viewCtrl: ViewController,
      fb: FormBuilder,
      private backendApiService : BackendApiService,
      public userService: UserService
      ) {
    this.user = params['data'];
    let namePipe = new UnicodeNamePipe();
    this.authForm = fb.group({
      'firstName': [namePipe.transform(this.user['first_name']), Validators.required],
      'lastName': [namePipe.transform(this.user['last_name']), Validators.required],
      'email': [this.user['email'], Validators.required],
      'birthday': [this.user['birthday'], Validators.required],
      'gender': [this.user['gender'], Validators.required],
      'location': [this.user['location'], Validators.required]
    });
    console.log(JSON.stringify(params));
  }

  onSubmit(value: string): void {
    console.log('you submitted value: ', JSON.stringify(value));
    this.backendApiService.updateUser(value).subscribe((userProfile: UserProfile) => {
      this.userService.setCurrentUser(userProfile);
      this.dismiss();
    });
  }

  getFirstName(fullName: string): string{
    let firstName: string = '';
    if(fullName.length > 0){
      let nameArray: string[] = fullName.split(' ');
      if(nameArray.length > 1){
        firstName = nameArray.slice(0, nameArray.length).join(' ');
      }
      return nameArray[0];
    }
    return firstName
  }

  getLastName(fullName: string): string{
    let lastName: string = '';
    if(fullName.length > 0){
      let nameArray: string[] = fullName.split(' ');
      if(nameArray.length > 1){
        lastName = nameArray[nameArray.length - 1];
      }
    }
    return lastName
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

