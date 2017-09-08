import {
  Component,
  OnInit,
  ElementRef,
  EventEmitter
} from '@angular/core';
import { LoadingController} from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

import { Observable } from 'rxjs';

import * as _ from 'lodash';

import { SpotifyService } from '../../providers/spotify-service';

/*
  Emits onSearchResults
*/
@Component({
  selector: 'spotify-search',
  templateUrl: 'spotify-search-component.html',
  outputs: ['onSearchTrackResults', 'onSearchArtistResults', 'onSearchAlbumResults'],
})
export class SpotifySearchComponent {
  searchInput: string = '';
  onSearchTrackResults: EventEmitter<any[]> = new EventEmitter<any[]>();
  onSearchArtistResults: EventEmitter<any[]> = new EventEmitter<any[]>();
  onSearchAlbumResults: EventEmitter<any[]> = new EventEmitter<any[]>();
  
  constructor(private spotify: SpotifyService,
  private loadingCtrl : LoadingController,
  private keyboard: Keyboard) {
  }

getItems(ev): void {
    var text = this.searchInput.trim()

    if (text.length == 0) {
      this.onCancel({});
      return;
    }
     //Tracks
    let loadingTracks = this.loadingCtrl.create({
      content: 'Searching Tracks. Please Wait...'
    });
    loadingTracks.present()
    this.spotify.searchTrack(text)
    .subscribe((res:any) => {
      // this.results = res.tracks.items;
      let results = _.uniqBy(res.tracks.items, 'id');
      this.onSearchTrackResults.emit(results);
      console.log("results", JSON.stringify(results));
    },
    (err: any) => {
      console.log(err);
    },
    () => {
      console.log("complete");
      loadingTracks.dismiss();
    });


    // Artists
    let loadingArtists = this.loadingCtrl.create({
      content: 'Searching Artists. Please Wait...'
    });
    loadingArtists.present();
    this.spotify.searchArtist(text)
      .subscribe((res: any) => {
        let artists = res.artists.items;
        this.onSearchArtistResults.emit(artists);
        console.log("artist results", JSON.stringify(artists));
      },
      (err: any) => {
        console.log(err);
      },
      () => {
        console.log("complete");
        loadingArtists.dismiss();
      });

    // Albums
    let loadingAlbums = this.loadingCtrl.create({
      content: 'Searching Albums. Please Wait...'
    });
    loadingAlbums.present();
    this.spotify.searchAlbum(text)
      .subscribe((res: any) => {
        let albums = res.albums.items;
        this.onSearchAlbumResults.emit(albums);
        console.log("album results", JSON.stringify(albums));
      },
      (err: any) => {
        console.log(err);
      },
      () => {
        console.log("complete");
        loadingAlbums.dismiss();
      });
  }

  onCancel(event){
    this.onSearchArtistResults.emit([]);
    this.onSearchAlbumResults.emit([]);  
    this.onSearchTrackResults.emit([]);
  }

  onSearch(event) {
    console.log("onSearch");
    this.keyboard.close();
  }
}
