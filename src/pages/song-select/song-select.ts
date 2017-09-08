import { Component } from '@angular/core';
import { ViewController, NavParams, NavController } from 'ionic-angular';
import * as _ from 'lodash';

import { SpotifyService } from '../../providers/spotify-service';
import { ArtistProfilePage } from '../artist-profile/artist-profile';
import { AlbumProfilePage } from '../album-profile/album-profile';
import { SpotifySearchModalService } from '../../providers/spotify-search-modal-service';
/*
  This will be a modal that is opened from many pages.  This page will allow a user to select song(s).
  It will accept an array of songs as an input so that all the search results will show which songs have already been selected.
  It will track as songs are selected/deselected as well.  Once the user indicates that they're all finished selecting songs,
  we will return the selected song array to the "caller" page so that the selected songs can be previewed.
*/
@Component({
  selector: 'page-song-select',
  templateUrl: 'song-select.html'
})
export class SongSelectPage {
  public selectedSongs: {};
  public songs: any[];
  public artists: any[];
  public albums: any[];

  constructor(private viewCtrl: ViewController,
    private navParams: NavParams,
    public navCtrl: NavController,
    public spotifyService: SpotifyService,
    private spotifySearchModalService: SpotifySearchModalService) {
    console.log("in constructor of SongSelectPage.");
    let inputSongs = this.navParams.get("selectedSongs");
    this.selectedSongs = this.getSelectedSongMap(inputSongs);
    //This is so children can close the parent modal.
    spotifySearchModalService.modalDoneAnnounced.subscribe((clicked) => {
      this.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('Hello SongSelectPage Page');
  }

  /*
  Takes an array of songs and returns an object with
  each song.album.id as the key and each song as the value.
  */
  getSelectedSongMap(songs: any[]): any {
    let selectedSongs = {};
    _.forEach(songs, function (song) {
      selectedSongs[song.id] = song;
    });
    console.log("selectedSongs is", selectedSongs);
    return selectedSongs;
  }

  onSearchTrackResults(songs: any[]) {
    // Loop through the songs.  If they're in selected...
    // make sure to... select them... somehow...
    console.log('onSearchTrackResults:', event);
    this.songs = songs;
  }

  onSearchArtistResults(artists: any[]) {
    console.log('onSearchArtistResults:', event);
    this.artists = artists;
  }

  onSearchAlbumResults(albums: any[]) {
    console.log('onSearchAlbumResults:', event);
    this.albums = albums;
  }

  dismiss() {
    this.viewCtrl.dismiss(this.convertSelectedSongsToSongs(this.selectedSongs));
  }

  convertSelectedSongsToSongs(selectedSongs: {}): any[] {
    let songs = [];
    for (var key in selectedSongs) {
      songs.push(selectedSongs[key]);
    }

    return songs;
  }

  openArtistProfile(artist: any): void {
    console.log("Going to artist profile page:", artist);
    this.navCtrl.push(ArtistProfilePage, { artist: artist, selectedSongs: this.selectedSongs });
    // Pull information about artist from Spotify


  }

  openAlbumProfile(album: any): void {
    console.log("Going to album profile page:", album);
    this.navCtrl.push(AlbumProfilePage, { album: album, selectedSongs: this.selectedSongs });
    // Pull information about artist from Spotify


  }

  hasSongs(): boolean {
    return Object.keys(this.selectedSongs).length > 0;
  }

}
