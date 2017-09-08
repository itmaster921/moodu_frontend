import { Component, Input, Inject, Output, EventEmitter } from '@angular/core';
import { CameraService } from '../../providers/camera-service';
import { ModalController, ActionSheetController } from 'ionic-angular';
import { Crop } from '@ionic-native/crop';

import { FileUploadResult } from '@ionic-native/transfer';

import { UserService } from '../../providers/user-service';
import { UserProfile } from '../../app/user-profile';
import { BackendApiService, BACKEND_API_URL } from '../../app/backend-api.service';

@Component({
  selector: 'add-background-picture',
  templateUrl: 'add-background-picture.html'
})
export class AddBackgroundPicture {
  @Input() showEdit: boolean;
  @Output() profileChanged = new EventEmitter();
  public currentUser: UserProfile;
  

  constructor(public cameraService : CameraService, 
  public modalCtrl: ModalController,
  public apiService: BackendApiService,
  public userService: UserService,
  public actionSheetCtrl: ActionSheetController,
  private crop: Crop,
  @Inject(BACKEND_API_URL) public apiUrl: string
  ) {
    console.log('Hello AddBackgroundPicture Component');
    this.userService.currentUser.subscribe((currentUser)=>{
      this.currentUser = currentUser;
    }, (err)=>{});
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
  
  choosePhotoFromCamera() {
    this.cameraService.getBackgroundPictureFromCamera().then(
      (imgPath) => {
        console.log("Got picture from camera");
        console.log(imgPath);
        this.crop.crop(imgPath, { quality: 75 })
          .then(newImage => {
            this.uploadProfileBackgroundPicture(newImage).then((res: FileUploadResult) => {
              console.log("upload response: ", JSON.stringify(res));
              let url = res.response.replace("\"", "").replace("\"", "");
              this.currentUser.profile_background_picture = url;
              this.userService.setCurrentUser(this.currentUser);
            },
              error => { console.error('Error cropping image', error); }
            );
          });
      });
  }

  choosePhotoFromFile(){
    this.cameraService.getBackgroundPictureFromRoll().then(
      (imgPath) => {
        console.log("Got picture from roll");
        console.log(imgPath);
        this.crop.crop(imgPath, { quality: 75 })
          .then(newImage => {
            this.uploadProfileBackgroundPicture(newImage).then((res: FileUploadResult) => {
              console.log("upload response: ", JSON.stringify(res));
              let url = res.response.replace("\"", "").replace("\"", "");
              this.currentUser.profile_background_picture = url;
              this.userService.setCurrentUser(this.currentUser);
            },
              error => { console.error('Error cropping image', error); }
            );
          });
      });
  }

  uploadProfileBackgroundPicture(uri: string): Promise<FileUploadResult>{
    console.log("uploading file: " + uri);
    return this.apiService.uploadProfileBackgroundPicture(uri);
  }
}
