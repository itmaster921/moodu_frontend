import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { BackendApiService } from '../../app/backend-api.service';
/*
  Generated class for the TestPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-test-page',
  templateUrl: 'test-page.html'
})
export class TestPage {
  profiles: any[];
  artists: any[];
  tracks: any[];

  constructor(public navCtrl: NavController, public platform: Platform, public apiService: BackendApiService) {
  }

  ionViewDidLoad() {
    console.log('Hello TestPage Page');
  }

  onSearchUserResults(profiles){
    console.log("user search:", profiles);
    this.profiles = profiles;
  }

  onSearchArtistResults(artists){
    console.log("artist result:", artists);
    this.artists = artists;
  }

  onSearchTrackResults(tracks){
    console.log("tracks result:", tracks);
    this.tracks = tracks;
  }


}
