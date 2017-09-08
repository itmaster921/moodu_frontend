import { Component, Inject } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProfile } from '../../app/user-profile';
import { UserService } from '../../providers/user-service';
import { BackendApiService, BACKEND_API_URL } from '../../app/backend-api.service';
import { FeedService } from '../../providers/feed-service';
import { ModalController } from 'ionic-angular';
import { EditProfilePage } from '../../pages/edit-profile/edit-profile';
/*
  Generated class for the UserProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  spotifyId: string;
  userProfile: UserProfile;
  currentUser: UserProfile;
  newsFeed: any;
  newsFeedSub: any;
  userProfileSub: any;
  currentUserSub: any;

  ionViewWillUnload() {
    console.log("UserProfilePage ionViewWillUnload");
  }

  constructor(public navCtrl: NavController,
    public params: NavParams,
    public userService: UserService,
    public backendApiService: BackendApiService,
    public modalCtrl: ModalController,
    @Inject(BACKEND_API_URL) public apiUrl: string,
    public feedService: FeedService) {
    console.log("UserProfilePage Constructor");
    this.subscribeToNewsFeed();
    this.loadUsers();
  }


  subscribeToNewsFeed() {
    console.log("subscribing to news feed");
    this.newsFeedSub = this.feedService.newsFeed.subscribe((newsFeed: any) => {
      this.newsFeed = newsFeed;
      console.log("just set this.newsFeed in user-profile.ts", this.newsFeed);
    }, (err) => { });
  }

  loadUsers() {
    console.log("in load users");
    // Set current user so we can determine whether to show 
    // edit profile buttons and whatnot.
    this.currentUserSub = this.userService.currentUser.subscribe((currentUser: UserProfile) => {
      this.currentUser = currentUser;
      let userProfile = this.params.get('userProfile');
      console.log("user profile", userProfile);
      if (userProfile == undefined) {
        this.userProfile = this.currentUser;
        console.log("Just set userProfile to currentUser");
      } else {
        this.backendApiService.getUser(userProfile.spotify_id).subscribe((userProfile) => {
          this.userProfile = userProfile;
          console.log("setting userProfile", this.userProfile);
        }, (err) => { });
      }

      console.log("just set this.currentUser", this.currentUser);
    });
  }


  ionViewWillEnter() {
    // this.spotifyId = this.params.get('spotifyId');
    console.log("UserProfilePage ionViewWillEnter()");
  }

  ionViewWillLeave() {
    this.currentUserSub.unsubscribe();
    this.newsFeedSub.unsubscribe();
  }

  openProfileSettingsModal() {
    console.log("Opening profile edit settings with " + JSON.stringify(this.currentUser));
    let modal = this.modalCtrl.create(EditProfilePage, this.currentUser);
    modal.present();
  }

}
