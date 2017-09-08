import * as _ from 'lodash';

import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

import { SpotifyService } from '../../providers/spotify-service';
import { AlbumProfilePage } from '../../pages/album-profile/album-profile';
import { SpotifySearchModalService } from '../../providers/spotify-search-modal-service';
/*
  Generated class for the ArtistProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-artist-profile',
  templateUrl: 'artist-profile.html'
})
export class ArtistProfilePage {
  artist: any;
  albums: any[];
  selectedSongs: any[];

  constructor(private navParams: NavParams, 
    private navCtrl: NavController, 
    private spotifyService: SpotifyService,
    public spotifySearchModalService: SpotifySearchModalService) {
    this.artist = navParams.get('artist');
    console.log(this.artist);
    this.selectedSongs = navParams.get('selectedSongs');
    this.loadAlbums();
    // console.log("Albums: ", this.albums);
  }

  loadAlbums(){
        this.spotifyService.getArtistAlbums(this.artist.id)
      .subscribe((res: any) => {
        this.albums = _.uniqBy(res.items, (album: any)=>{
          return album.name;
        })
      }, (err) =>{
        console.log("failed to load artist's albums");
      })
  }

  ionViewDidLoad() {
    console.log('Hello ArtistProfilePage Page');
  }

  openAlbumProfile(album: any): void {
    console.log("Going to album profile page:", album);
    this.navCtrl.push(AlbumProfilePage, {album: album, selectedSongs: this.selectedSongs});
  }

  notifyDone() {
    this.spotifySearchModalService.announceDone("clicked done");
    this.navCtrl.pop();
  }

  hasSongs(): boolean {
    return Object.keys(this.selectedSongs).length > 0;
  }
}
