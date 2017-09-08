import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SpotifyService } from '../../providers/spotify-service';
import { SpotifySearchModalService } from '../../providers/spotify-search-modal-service';
/*
  Generated class for the AlbumProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-album-profile',
  templateUrl: 'album-profile.html'
})
export class AlbumProfilePage {
  album: any;
  songs: any[];
  artists: any[];
  selectedSongs: any[];
  albumName: string;

  constructor(public navCtrl: NavController,
    private spotifyService: SpotifyService,
    private navParams: NavParams,
    public spotifySearchModalService: SpotifySearchModalService) {
    this.album = navParams.get('album');
    this.selectedSongs = navParams.get('selectedSongs');
    this.albumName = this.album.name;
    this.loadTracks();

  }

  ionViewDidLoad() {
    console.log('Hello AlbumProfilePage Page');
  }

  loadTracks() {
    this.spotifyService.getAlbum(this.album.id)
      .subscribe((res: any) => {
        let tempSongs = res.tracks.items;
        for(let i = 0; i < tempSongs.length; i++){
          tempSongs[i].album = this.album;
        }
        this.songs = tempSongs;
        console.log("pulled in album info", res);
      }, (err) => {
        console.log("failed to load artist's albums");
      })
  }

   notifyDone() {
    this.spotifySearchModalService.announceDone("clicked done");
    this.navCtrl.pop();
  }

  hasSongs(): boolean {
    return Object.keys(this.selectedSongs).length > 0;
  }
}
