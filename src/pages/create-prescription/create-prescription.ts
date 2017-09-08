import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the CreatePrescription page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-prescription',
  templateUrl: 'create-prescription.html'
})
export class CreatePrescriptionPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello CreatePrescriptionPage Page');
  }

}
