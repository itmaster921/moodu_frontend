import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccessTokenService } from '../../app/access-token.service'
/*
  Generated class for the PlaySongs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-play-songs',
  templateUrl: 'play-songs.html'
})
export class PlaySongsPage {
songs : any[];
currentSong: any;
currentIndex: any;
songProgress: number;
playing: boolean;
useFullUrlOnPlay: boolean;
session: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public accessTokenService: AccessTokenService) {
    this.songs = navParams.get('songs');
    this.currentIndex = navParams.get('index') || 0;
    this.setCurrentSong(this.currentIndex);
    this.songProgress = 0;
    this.playing = false;
    this.useFullUrlOnPlay = true;
    this.session = this.accessTokenService.getSession();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaySongsPage');
  }

  ionViewWillLeave() {
    this.session.pause();
  }

  playSong(song){
    var playRes = this.session.play(song.spotify_uri);
    this.playing = true;
  }

  setCurrentSong(index){
    this.currentIndex = index;
    this.currentSong = this.songs[this.currentIndex];
  }

  playNextSong() {
    this.currentIndex += 1;
    if(this.currentIndex >= this.songs.length){
      this.currentIndex = 0;
    }
    this.setCurrentSong(this.currentIndex);
    this._playSongIfPlaying();
  }

  playPreviousSong() {
    this.currentIndex -= 1;
    if(this.currentIndex < 0){
      this.currentIndex = this.songs.length-1;
    }
    this.setCurrentSong(this.currentIndex);
    this._playSongIfPlaying();
  }

  isPlaylist(){
    let length = this.songs.length;
    return length > 1;
  }

  _playSongIfPlaying(){
    let isPlaying = this.playing;
    if(isPlaying){
      this.playSong(this.songs[this.currentIndex]);
    } else {
      this.useFullUrlOnPlay = true;
    }
  }

  togglePlay(){
    this.playing = !this.playing;
    if (this.playing && this.useFullUrlOnPlay){
      this.playSong(this.currentSong);
    } else if(this.playing) {
      this.session.play();
    } else {
      this.session.pause();
    }

    this.useFullUrlOnPlay = false;

  }
}
