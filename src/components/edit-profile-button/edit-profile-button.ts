import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { EditProfilePage } from '../../pages/edit-profile/edit-profile';
import { UserProfile } from '../../app/user-profile';
import { UserService } from '../../providers/user-service';
/*
  Generated class for the EditProfileButton component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'edit-profile-button',
  templateUrl: 'edit-profile-button.html'
})
export class EditProfileButton {
  profile: UserProfile;

  constructor(public modalCtrl: ModalController,
  public userService: UserService) {
    console.log('Hello EditProfileButton Component');
    this.userService.currentUser.subscribe((currentUser)=>{
      this.profile = currentUser;
    },(res)=>{});
  }

  openProfileSettingsModal() {
    console.log("Opening profile edit settings with " + JSON.stringify(this.profile));
    let modal = this.modalCtrl.create(EditProfilePage, this.profile);
    modal.present();
  }

}
