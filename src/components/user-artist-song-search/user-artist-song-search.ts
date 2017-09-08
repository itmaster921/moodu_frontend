import {
  Component,
  ElementRef,
  EventEmitter
} from '@angular/core';

import { FormControl } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';

import { LoadingController} from 'ionic-angular';
import * as _ from 'lodash';

import { BackendApiService } from '../../app/backend-api.service';
import { SpotifyService } from '../../providers/spotify-service';
/*
  Emits onSearchResults
*/
@Component({
  selector: 'user-artist-song-search',
  templateUrl: 'user-artist-song-search.html',
  outputs: ['onSearchTrackResults', 'onSearchArtistResults', 'onSearchUserResults'],
})
export class UserArtistSongSearchComponent {
  onSearchUserResults: EventEmitter<any[]> = new EventEmitter<any[]>();
  onSearchTrackResults: EventEmitter<any[]> = new EventEmitter<any[]>();
  onSearchArtistResults: EventEmitter<any[]> = new EventEmitter<any[]>();
  searchInput: string = '';
  searchControl: FormControl;
  constructor(private el: ElementRef, private backendApiService: BackendApiService,    
  private spotify: SpotifyService,
  private loadingCtrl : LoadingController,
  private keyboard: Keyboard) {
  }

  getItems(ev): void {
    var text = this.searchInput.trim()
    // Users
    if (text.startsWith('@') && text.length > 2){

      let loadingUsers = this.loadingCtrl.create({
        content: 'Searching Users. Please Wait...'
      });
      loadingUsers.present()
      let name = text.slice(1);
      this.backendApiService.searchUser(name)
      .subscribe((res:any) => {
        this.onSearchUserResults.emit(res);
        this.onSearchArtistResults.emit([]);
        this.onSearchTrackResults.emit([]);
        console.log("res", JSON.stringify(res));
      },
      (err: any) => {
        console.log(err);
      },
      () => {
        console.log("complete");
        loadingUsers.dismiss();
      });
    }
    
    //Tracks
    if (!text.startsWith('@') && text.length > 1){
      let loadingTracks = this.loadingCtrl.create({
        content: 'Searching Tracks. Please Wait...'
      });
      loadingTracks.present()
      this.spotify.searchTrack(text)
      .subscribe((res:any) => {
        // this.results = res.tracks.items;
        let results = _.uniqBy(res.tracks.items, 'id');
        this.onSearchTrackResults.emit(results);
        this.onSearchUserResults.emit([]);
        console.log("results", JSON.stringify(results));
      },
      (err: any) => {
        console.log(err);
      },
      () => {
        console.log("complete");
        loadingTracks.dismiss();
      });
    }
    
    //Artists
    if (!text.startsWith('@') && text.length > 1){
      let loadingArtists = this.loadingCtrl.create({
        content: 'Searching Artists. Please Wait...'
      });
      loadingArtists.present();
      this.spotify.searchArtist(text)
      .subscribe((res:any) => {
        let artists = res.artists.items;
        this.onSearchArtistResults.emit(artists);
        this.onSearchUserResults.emit([]);
        console.log("artist results", JSON.stringify(artists));
      },
      (err: any) => {
        console.log(err);
      },
      () => {
        console.log("complete");
        loadingArtists.dismiss();
      });
    }
    if (text.length == 0){
      this.onCancel({});
    }
  }

  onSearch(event) {
    console.log("onSearch");
    // this.keyboard.close();
  }

  onBlur(event) {
    console.log("in onBlur");
    // this.keyboard.close();
  }

  onCancel(event){
    this.onSearchArtistResults.emit([]);
    this.onSearchUserResults.emit([]);  
    this.onSearchTrackResults.emit([]);
  }
}
