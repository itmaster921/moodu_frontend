import { Component, Input, Output, EventEmitter } from '@angular/core';
/*
  Generated class for the ArtistList component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'artist-list',
  templateUrl: 'artist-list.html'
})
export class ArtistListComponent {
@Input('header') header: string;
@Input('artists') artists: any[];
@Output() onArtistClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    console.log('Hello ArtistList Component');
  }

  openArtistProfile(artist: any):void {
    console.log("emitting onArtistClick", artist);
    this.onArtistClick.emit(artist);
  }

  getSmallImage(artist: any){
    let length = artist.images.length;
    return artist.images[length-2].url;
  }
}
