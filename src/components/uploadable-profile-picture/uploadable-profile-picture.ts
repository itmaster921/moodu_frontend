import { Component, Input, Inject, AfterViewChecked } from '@angular/core';
import { CameraService } from '../../providers/camera-service';
import { Crop } from '@ionic-native/crop';

import { ModalController, ActionSheetController } from 'ionic-angular';

import { BackendApiService, BACKEND_API_URL } from '../../app/backend-api.service';
import { UserService } from '../../providers/user-service';
import { UserProfile } from '../../app/user-profile';
import { FileUploadResult } from '@ionic-native/transfer';
/*
  Generated class for the UploadableProfilePicture component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'uploadable-profile-picture',
  templateUrl: 'uploadable-profile-picture.html'
})
export class UploadableProfilePicture implements AfterViewChecked {
  @Input() profileUrl: string;
  @Input() showEdit: boolean;
  public currentUser: UserProfile;
  loaded: boolean;

  constructor(public cameraService: CameraService,
    public modalCtrl: ModalController,
    public apiService: BackendApiService,
    public userService: UserService,
    public actionSheetCtrl: ActionSheetController,
    private crop: Crop,
    @Inject(BACKEND_API_URL) public apiUrl: string
  ) {
    console.log('Hello UploadableProfilePicture Component', this.profileUrl);
    this.loaded = false;
    this.userService.currentUser.subscribe((currentUser) => {
      this.currentUser = currentUser;
    }, (err) => { });
  }

  presentPhotoActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.choosePhotoFromFile();
          }
        }, {
          text: 'Use Camera',
          handler: () => {
            this.choosePhotoFromCamera();
          }
        }, {
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
    console.log("About to call getPictureFromCamera()");
    this.cameraService.getPictureFromCamera().then((imgPath) => {
      console.log("Got picture from camera", imgPath);
      this.crop.crop(imgPath, { quality: 75 })
        .then(newImage => {
          console.log("Just cropped.  New image is", newImage);
          this.uploadProfilePicture(newImage).then((res: FileUploadResult) => {
            console.log("upload response: ", JSON.stringify(res));
            let profileUrl = res.response.replace("\"", "").replace("\"", "");
            this.currentUser.profile_picture = profileUrl;
            this.userService.setCurrentUser(this.currentUser);
          });
        },
        error => console.error('Error cropping image', error)
        );


    });
  }

  choosePhotoFromFile() {
    this.cameraService.getPictureFromRoll().then((imgPath) => {
      console.log("Got picture from file", imgPath);
      this.crop.crop(imgPath, { quality: 75 })
        .then(newImage => {
          console.log("Just cropped.  New image is", newImage);
          this.uploadProfilePicture(newImage).then((res: FileUploadResult) => {
            console.log("upload response: ", JSON.stringify(res));
            let profileUrl = res.response.replace("\"", "").replace("\"", "");
            this.currentUser.profile_picture = profileUrl;
            this.userService.setCurrentUser(this.currentUser);
          }, (err) => {
            console.log("failed to upload file.  " + JSON.stringify(err));
          });
        },
        error => console.error('Error cropping image', error));

    }, (err) => {
      console.log("Failed to get picture from file");
    });
  }

  uploadProfilePicture(uri: string): Promise<FileUploadResult> {
    console.log("uploading file: " + uri);
    return this.apiService.uploadProfilePicture(uri);
  }

  ngAfterViewChecked() {
    if (this.loaded == false && this.profileUrl != undefined) {
      this.loaded = true;
    }
  }


}
