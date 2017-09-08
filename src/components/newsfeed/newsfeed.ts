import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AccessTokenService } from '../../app/access-token.service';
import { PlaySongsPage } from '../../pages/play-songs/play-songs';

/*
  Generated class for the Newsfeed component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'newsfeed',
  templateUrl: 'newsfeed.html'
})
export class NewsfeedComponent {
  @Input() activities: any[];
  @Output() onUserItemClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(public accessTokenService: AccessTokenService, 
  public navCtrl: NavController) {
    console.log('Hello Newsfeed Component');
    
  }

  clickedOnUser(spotifyId){
    this.onUserItemClick.next({'spotifyId' : spotifyId});
  }

  openPlaySongsPage(songs, index){
    // let session = this.accessTokenService.getSession();
    // var playRes = session.play(spotifyUri);
    // console.log("playRes:", playRes, JSON.stringify(playRes));
    this.navCtrl.push(PlaySongsPage, {songs:songs, index:index});

  }

}
