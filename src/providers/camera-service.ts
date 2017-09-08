import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Camera } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';

/*
  Generated class for the CameraService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CameraService {

  constructor(public http: Http, private camera: Camera, private mediaCapture: MediaCapture) {
    console.log('Hello CameraService Provider');
  }

  getPictureFromCamera(): Promise<any> {
    return this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      quality: 75,
      targetWidth: 250,
      targetHeight: 250,
      cameraDirection: 1
    }).then((imageUrl) => {
      // imageData is a uri
      console.log(imageUrl)
      return imageUrl;
    }, (err) => {
      console.log(JSON.stringify(err));
    });
  }

  getPictureFromRoll(): Promise<any> {
    return this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      quality: 75,
      targetWidth: 250,
      targetHeight: 250
    }).then((imageUri) => {
      // imageData is a uri
      console.log(imageUri)
      return imageUri;
    }, (err) => {
      console.error(JSON.stringify(err));
    });
  }

  /*
  {
    end: 0
    fullPath: "file:///storage/emulated/0/DCIM/Camera/VID_20170213_205252.mp4"
    lastModified: null
    lastModifiedDate: 1487044372000
    localURL: "cdvfile://localhost/sdcard/DCIM/Camera/VID_20170213_205252.mp4"
    name: "VID_20170213_205252.mp4"
    size: 2129180
    start: 0
    type: "video/mp4"
}
  */
  getVideoFromCamera(): Promise<string> {
    let options: CaptureVideoOptions = {
      limit: 1,
      duration: 30
    };
    return this.mediaCapture.captureVideo(options)
      .then(
      (data: MediaFile[]) => {
        console.log("retval from camera-service capture video:", data);
        return data[0].fullPath;
      },
      (err: CaptureError) => console.error(err)
      );

  }

/*
  /storage/emulated/0/DCIM/Camera/VID_20170210_202854.mp4
*/
  getVideoFromRoll(): Promise<any> {
    return this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      quality: 75,
      targetWidth: 250,
      targetHeight: 250,
      mediaType: 1
    }).then((imageUri) => {
      // imageData is a uri
      console.log(imageUri)
      return imageUri;
    }, (err) => {
      console.log(JSON.stringify(err));
    });
  }

  getBackgroundPictureFromCamera(): Promise<any> {
    return this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      quality: 75,
      targetWidth: 1300,
      targetHeight: 406
    }).then((imageUrl) => {
      // imageData is a uri
      console.log(imageUrl)
      return imageUrl;
    }, (err) => {
      console.log(JSON.stringify(err));
    });
  }

  getBackgroundPictureFromRoll(): Promise<any> {
    return this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      quality: 75,
      targetWidth: 1300,
      targetHeight: 406
    }).then((imageUri) => {
      // imageData is a uri
      console.log(imageUri)
      return imageUri;
    }, (err) => {
      console.log(JSON.stringify(err));
    });
  }
}
