import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the UserSelect page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-select',
  templateUrl: 'user-select.html'
})
export class UserSelectPage {
  profiles: any[] = [];
  selectedProfiles: any[];
  constructor(public navCtrl: NavController,
  private navParams: NavParams,
  public viewCtrl: ViewController) {
    this.selectedProfiles = this.navParams.get("selectedProfiles");
  }

  ionViewDidLoad() {
    console.log('Hello UserSelectPage Page');
  }

    dismiss() {
    this.viewCtrl.dismiss(this.selectedProfiles);
  }

setProfiles(profiles: any[]){
  this.profiles = profiles;
}

}
