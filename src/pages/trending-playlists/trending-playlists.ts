import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { CreatePlaylistPage } from '../create-playlist/create-playlist';
import { PlaySongsPage } from '../play-songs/play-songs';
import { BackendApiService } from '../../app/backend-api.service';
import { PlaylistService } from '../../providers/playlist-service';
/*
  Generated class for the TrendingPlaylists page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-trending-playlists',
  templateUrl: 'trending-playlists.html'
})
export class TrendingPlaylistsPage implements OnInit{
  playlists: any[] = [];
  constructor(public navCtrl: NavController,
              private backendApiService : BackendApiService,
              private playlistService: PlaylistService,
              private loadingCtrl: LoadingController ) {
  }

  ionViewDidLoad() {
    console.log('Hello TrendingPlaylistsPage Page');
    this.playlistService.playlists.subscribe((res) =>{
      this.playlists = res;
    });
    this.refreshPlaylists();
  }

  ngOnInit(): void {
    // Make call to get playlists
  }

  refreshPlaylists(): void {
    let loadingPlaylists = this.loadingCtrl.create({
        content: 'Loading Playlists. Please Wait...'
      });
      loadingPlaylists.present();
      this.backendApiService.getPlaylists().subscribe((res) => {
        this.playlistService.setPlaylists(res);
    },
    (err: any) => {
        console.log(err);
      },
      () => {
        console.log("complete");
        loadingPlaylists.dismiss();
      });
  }

  openCreatePlaylistPage(){
    this.navCtrl.push(CreatePlaylistPage);
  }

  openPlaySongsPage(songs){
    this.navCtrl.push(PlaySongsPage, {songs: songs, index:0});
  }
}
