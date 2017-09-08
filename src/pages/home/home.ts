import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';
import 'rxjs/Rx';

import { SignUpPage } from '../sign-up/sign-up'
import { TabsPage } from '../tabs/tabs';
import { TrendingPlaylistsPage } from '../trending-playlists/trending-playlists';
import { CreatePlaylistPage } from '../create-playlist/create-playlist';
import { SongDetailPage } from '../song-detail/song-detail';
import { HomeTabPage } from '../home-tab/home-tab';
import { TestPage } from '../test-page/test-page';
import { UserProfile } from '../../app/user-profile';
import { PlaySongsPage } from '../play-songs/play-songs';
import { CreatePage } from '../create/create';
import { UserProfilePage } from '../user-profile/user-profile';

import { BackendApiService } from '../../app/backend-api.service';
import { AccessTokenService } from '../../app/access-token.service';
import { NavigationService } from '../../providers/navigation-service';
import { UserService } from '../../providers/user-service';

// import { NavigationService } from '../../providers/navigation-service';

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  private spotifyClientId: string = "9270e6e46ec3431abc303cff469107f4";
  private spotifyScopes: any[] = ["streaming", "user-follow-modify", "user-follow-read", "playlist-read-private", "playlist-read-collaborative", "playlist-modify-public", "playlist-modify-private", "user-library-read", "user-library-modify", "user-read-birthdate", "user-read-email"];
  private spotifyRedirectURI: string = "moodu://callback";
  private serverlessExchange: string = "https://lycv5x7gg1.execute-api.us-west-1.amazonaws.com/dev/exchange";
  private serverlessRefresh: string = "https://lycv5x7gg1.execute-api.us-west-1.amazonaws.com/dev/refresh";

  // private user: any = null;
  constructor(public navCtrl: NavController, private platform: Platform,
    public backendApiService: BackendApiService,
    public accessTokenService: AccessTokenService,
    public userService: UserService,
    public navigationService: NavigationService) {

    this.accessTokenService.clearAccessToken();

    let kellyProfile = new UserProfile();
//  userProfile.access_token = "BQBRx-6ult35jMIVEsySOfibhn7Vgq3IlMCp3w9ANjRid_19sH20aFT_Vi8KHY5Q0rrHnWav0pm6B4d_2W2frdmwg1Nj26pfKU97QltqID_At7M
//q-NfypFqqpuwleBRXZXVGrNIdd7VGAl9lr7qy8GrkqFrBMP3S6sE";
    kellyProfile.url = "http://192.168.0.135:8000/users/23/";
    kellyProfile.user = "22rtjcrjy7qe7lxwxzwpwpprq";
    kellyProfile.email = "kelbolicious@gmail.com";
    kellyProfile.profile_background_picture = "";
    kellyProfile.profile_picture = "";
    kellyProfile.followers = 0;
    kellyProfile.following = 0;
    kellyProfile.gender = "M";
    kellyProfile.profile_picture = "/media/user_uploads/name_fS64m2S.jpg";
    kellyProfile.spotify_id = "22rtjcrjy7qe7lxwxzwpwpprq";
    kellyProfile.birthday = "1985-01-23";
    kellyProfile.first_name = "Kelly";
    kellyProfile.last_name = "Nicholes"
    kellyProfile.username = "22rtjcrjy7qe7lxwxzwpwpprq";
    this.userService.setCurrentUser(kellyProfile);
    this.accessTokenService.setSession({
      access_token: 'BQC2Ce_74St4WLpd3Ja0uZXDoriGKPQMKFQyE6jIHMqmBjX2GFmcjdYFMPdPVPTKyx4zGMEhQJVI69lWBBCu2UoM9nxNUdtbBWvGe14o63z4VjfKY73VV7_zdHILl3gLJHK8zVXTpaPygMHqaczVUaygHy9wT4QgtIUCaWwg5eGkAjXjehv5BwrqeYaRfPIuNy1HXVm9dbmKLlFMkg1PsdAKnY-3NqjkZa1Pbid4kfyXqMPQ_ZyOHZEodayYiC2iGBsdK10Y93Itvj1PjonJGiPwdZZW0EJdmLTh6OjtxO35KiTKCCdtkc3gYRYiCytmJjxT7HI',
      accessToken: 'BQC2Ce_74St4WLpd3Ja0uZXDoriGKPQMKFQyE6jIHMqmBjX2GFmcjdYFMPdPVPTKyx4zGMEhQJVI69lWBBCu2UoM9nxNUdtbBWvGe14o63z4VjfKY73VV7_zdHILl3gLJHK8zVXTpaPygMHqaczVUaygHy9wT4QgtIUCaWwg5eGkAjXjehv5BwrqeYaRfPIuNy1HXVm9dbmKLlFMkg1PsdAKnY-3NqjkZa1Pbid4kfyXqMPQ_ZyOHZEodayYiC2iGBsdK10Y93Itvj1PjonJGiPwdZZW0EJdmLTh6OjtxO35KiTKCCdtkc3gYRYiCytmJjxT7HI',
      play: (url)=>{ console.log("Play(" + url + ")");},
      pause: ()=>{ console.log("pause")},
      refreshToken: 'refresh'
    });
    // If there is no access_token, get one.
    // if (this.accessTokenService.getAccessToken() == null ||
    //   this.accessTokenService.getAccessToken().length == 0) {
    //   this.login();
    // }
    // else {
    //   console.log('about to make a call to /spotify/me/');
    //   this.getUserInfoAndRedirect();
    // }
    this.goToPageBeingTested();
  }

  goToPageBeingTested() {
    this.navCtrl.setRoot(TabsPage);
  }

  getUserInfoAndRedirect(): void {
    this.backendApiService.getSpotifyUserByAccessToken(this.accessTokenService.getAccessToken())
      .subscribe(res => {
        let spotifyUserJson = res;
        // This person is now logged in with spotify. 
        // Have they already registered?
        this.backendApiService.getUser(spotifyUserJson.id)
          .subscribe(
          res => {
            console.log("Result from getting a user by spotify id: ", JSON.stringify(res));
            if (res.gender && res.birthday) {
              this.userService.setCurrentUser(res);
              this.goToProfilePage(res);
            } else {
              this.goToSignUp(spotifyUserJson);
            }
          },
          err => {
            console.log("There was an error getting user by spotify Id", JSON.stringify(err));

          });

      },
      err => {
        console.log(JSON.stringify(err));
        if (err.status == 403) {
          this.accessTokenService.clearAccessToken();
          this.login();
        }
      },

      () => console.log("done"));
  }

  goToProfilePage(userProfile: UserProfile) {
    console.log("Navigating to profile:", JSON.stringify(userProfile));
    this.navCtrl.popToRoot({animate: false});
    this.navigationService.activeTab.next(4);
    this.navCtrl.setRoot(TabsPage, {}, {animate: false});
  }

  login() {
    this.platform.ready().then(() => {
      let authOptions = {
        clientId: this.spotifyClientId,
        urlScheme: "moodu",
        scopes: this.spotifyScopes,
        tokenSwapUrl: this.serverlessExchange,
        tokenRefreshUrl: this.serverlessRefresh
      };
      let spotify = cordova.plugins.spotify;
      return cordova.plugins.spotify.login(authOptions)
        .then(session => session ? session : spotify.authenticate(authOptions))
        .then(session => {
          console.log("Adding listeners")
          session.addListener('playbackevent', this._onPlaybackEvent, this);
          session.addListener('playbackerror', this._onPlaybackError, this);
          this.accessTokenService.setSession(session);
          this.getUserInfoAndRedirect();
        }, err => {
          console.log("error! logging in", err)
          // this.login();
        });
    });
  }

  _onPlaybackEvent(event) {
    switch (event) {
      case 'Pause':
      case 'Play':
        console.log('player type:', event.toLowerCase());
        break;
      case 'TrackDelivered':
        console.log('player finished');
        break;
      case 'LostPermission':
        console.log("Error.  permissionlost.  Someone else started using your Spotify account.");
        break;
      default:
        console.log(event);
    }
  }

  _onPlaybackError(err) {
    console.log('error', err);
  }

  goToSignUp(user: any) {
    this.navCtrl.setRoot(SignUpPage, user);
  }
}
