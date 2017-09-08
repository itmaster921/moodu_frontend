import * as _ from 'lodash';

import { Component } from '@angular/core';
import { NavController, ModalController, ActionSheetController, Loading, LoadingController, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { FileUploadResult } from '@ionic-native/transfer';

import { SongSelectPage } from '../song-select/song-select';
import { UserSelectPage } from '../user-select/user-select';
import { TabsPage } from '../tabs/tabs';
import { TrendingPlaylistsPage } from '../trending-playlists/trending-playlists';
import { PlaylistService} from '../../providers/playlist-service';
import { CameraService } from '../../providers/camera-service';
import { BackendApiService, BACKEND_API_URL } from '../../app/backend-api.service';


/*
  Generated class for the CreatePlaylist page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-playlist',
  templateUrl: 'create-playlist.html'
})
export class CreatePlaylistPage {

  playlist : FormGroup;
  // These are the songs that will be saved when the user saves the playlist.
  songs: any[];
  profiles: any[];
  loading: Loading;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
  private formBuilder: FormBuilder,
  private backendApiService : BackendApiService,
  private playlistService: PlaylistService,
  private cameraService: CameraService,
  public actionSheetCtrl: ActionSheetController,
  public loadingCtrl: LoadingController,
  public toastCtrl: ToastController
  ) {
    this.songs = [];
    this.profiles = [];
    this.playlist = this.formBuilder.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
      // songs: [this.songs, Validators.required],
      // users: ['', Validators.required],
      public: [true],
      locked: [true],
      image: [''],
      video: ['']
    });
  }

  ionViewDidLoad() {
    console.log('Hello CreatePlaylistPage Page');
  }

  openSongSearchModal() {
    console.log("in openSongSearchModal");
    let modal = this.modalCtrl.create(SongSelectPage, {selectedSongs: this.songs, nav:this.navCtrl});
    modal.onDidDismiss(data => {
      console.log("song search modal just dismissed with", data);
      this.songs = data;
   });
    modal.present();
  }

  openUserProfileSearchModal() {
    console.log("in openUserSearchModal");
    let modal = this.modalCtrl.create(UserSelectPage, {selectedProfiles: _.clone(this.profiles)});
    modal.onDidDismiss(data => {
      console.log("user search modal just dismissed with", data);
     this.profiles = data;
     console.log("This.profiles after dismission:", this.profiles);
   });
    modal.present();
  }

  savePlaylist(){
    let playlist = this.playlist.value;
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();
    console.log("in save playlist.  this.profiles: ", this.profiles, "this.songs: ", this.songs);
    this.backendApiService.savePlaylist(playlist, this.songs, this.profiles)
      .subscribe((savedPlaylist) => {
        //Go to the trending playlist page.
        this.loading.dismissAll()
        console.log("successfully saved playlist", JSON.stringify(savedPlaylist));
        this.refreshPlaylists();
        this.navCtrl.setRoot(TabsPage);
        this.navCtrl.parent.select(1); 
        this.navCtrl.push(TrendingPlaylistsPage);
    }, (err) => {
      this.loading.dismissAll()
      this.presentToast('Error while saving playlist.');
      console.log("failed to save playlist", err);
    });
  }
 
  private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

  refreshPlaylists(){
    this.backendApiService.getPlaylists().subscribe((res) => {
        this.playlistService.setPlaylists(res);
    });
  }

  choosePhotoFromCamera(){
    this.cameraService.getPictureFromCamera().then((res) => {
      console.log("Got picture from camera", res);
      console.log(this.playlist.controls);
      this.playlist.controls['image'].setValue(res);
      this.playlist.controls['video'].setValue('');
    });
  }

  choosePhotoFromFile(){
    this.cameraService.getPictureFromRoll().then((res) => {
      console.log("Picture from file", res);
      this.playlist.controls['image'].setValue(res);
      this.playlist.controls['video'].setValue('');
    }, (err) => {
      console.log("Failed to get picture from file");
    });
  }

  chooseVideoFromFile(){
    this.cameraService.getVideoFromRoll().then((res) =>{
      this.playlist.controls['video'].setValue(res);
      this.playlist.controls['image'].setValue('');
      console.log("Video from file:", this.playlist.controls['video'].value);
    });
  }

  chooseVideoFromCamera(){
    this.cameraService.getVideoFromCamera().then((res) =>{
      this.playlist.controls['video'].setValue(res);
      this.playlist.controls['image'].setValue('');
      console.log("Video from Camera:", this.playlist.controls['video'].value);
    });
  }
  
  presentPhotoActionSheet(){
  let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.choosePhotoFromFile();
          }
        },{
          text: 'Use Camera',
          handler: () => {
            this.choosePhotoFromCamera();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  presentVideoActionSheet(){
  let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Video Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.chooseVideoFromFile();
          }
        },{
          text: 'Use Camera',
          handler: () => {
            this.chooseVideoFromCamera();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  uploadPicture(uri: string): Promise<FileUploadResult>{
    console.log("uploading file: " + uri);
    return this.backendApiService.uploadPicture(uri);
  }








}
