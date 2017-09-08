import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateClipPage } from '../create-clip/create-clip';
import { CreateMoodPage } from '../create-mood/create-mood';
import { CreatePlaylistPage } from '../create-playlist/create-playlist';
import { CreatePrescriptionPage } from '../create-prescription/create-prescription';
import { CreateTrackPostPage } from '../create-track-post/create-track-post';

/*
  Generated class for the Create page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})
export class CreatePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello CreatePage Page');
  }

  goToPostTrack(){
    console.log("going to post track");
    this.navCtrl.push(CreateTrackPostPage);
  }

  goToSetMood(){
    this.navCtrl.push(CreateMoodPage);
    console.log("going to set mood");
  }

  goToPrescribeSong(){
    this.navCtrl.push(CreatePrescriptionPage);
    console.log("going to prescribe song");
  }

  goToCreatePlaylist(){
    this.navCtrl.push(CreatePlaylistPage);
    console.log("going to createPlaylist");
  }

  goToSendClip(){
    this.navCtrl.push(CreateClipPage);
    console.log("going to send clip");
  }
}
