import { Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';

import {BehaviorSubject} from 'rxjs';

import { UserProfile } from '../app/user-profile';
import { UserProfilePage } from '../pages/user-profile/user-profile';

/*
  Generated class for the NavigationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NavigationService {
  activeTab: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {
    console.log('Hello NavigationService Provider');
  }
  
  /**
  * Gets the user profile info from the backend and navigates to the profile page.
  */
  viewProfileForUser(userProfile: UserProfile): void {
        console.log("Going to profile page");
    // this.navCtrl.parent.select(5); 
    // this.navCtrl.setRoot(UserProfilePage, userProfile);
  }

  setActiveTab(tabId: number): void {
    this.activeTab.next(tabId);
  }

}
