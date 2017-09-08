import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserProfilePage } from '../user-profile/user-profile';
import { ArtistProfilePage } from '../artist-profile/artist-profile';
import { BackendApiService } from '../../app/backend-api.service';
import { FeedService } from '../../providers/feed-service';
import { UserService } from '../../providers/user-service';
import { AccessTokenService } from '../../app/access-token.service';
import { UserProfile } from '../../app/user-profile';
import { PlaySongsPage } from '../play-songs/play-songs';

/*
  Generated class for the HomeTab page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home-tab',
  templateUrl: 'home-tab.html'
})
export class HomeTabPage {
  profiles: any[];
  activities: any[];
  artists: any[];
  tracks: any[];

  constructor(public navCtrl: NavController,
    public backendApiService: BackendApiService,
    public userService: UserService,
    public feedService: FeedService,
    public accessTokenService: AccessTokenService) {

      
      this.userService.currentUser
        .flatMap((up: UserProfile) => {
          return this.backendApiService.getNewsFeed(up.username);
        })
        .subscribe((res)=>{
          this.activities = res;
          console.log("ACTIVITIES:", this.activities);
        }, (err)=>{});
  }

  onSearchUserResults(profiles) {
    this.profiles = profiles;
  }

  onSearchArtistResults(artists){
    this.artists = artists;
  }

  onSearchTrackResults(tracks){
    this.tracks = tracks;
  }

  goToUserProfile(event) {
    let userProfile = event.profile;
    let spotifyId = event.spotifyId;
    if (userProfile != undefined) {
      spotifyId = userProfile.spotify_id
    }
    console.log("going to the user profile page with profile:", userProfile);
    this.navCtrl.push(UserProfilePage, { userProfile: userProfile })
  }

  goToArtistPage(artist){
    console.log("opening artist page for ", artist);
    this.navCtrl.push(ArtistProfilePage, {artist: artist, selectedSongs: []});
  }

  songClicked(event){
    console.log("Song was clicked", event.song);
    let song = {title: event.song.name,
                album_artwork: event.song.album.images[0].url,
              artists: event.song.artists,
            spotify_url: event.song.uri};
    this.navCtrl.push(PlaySongsPage, {songs:[song]})
  }
}
