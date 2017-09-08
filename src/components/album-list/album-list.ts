import { Component, Input, Output, EventEmitter } from '@angular/core';

/*
  Generated class for the AlbumList component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'album-list',
  templateUrl: 'album-list.html'
})
export class AlbumListComponent {

  @Input('header') header: string;
  @Input('albums') albums: any[];
  @Output() onAlbumClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    console.log('Hello AlbumList Component');

  }

  openAlbumProfile(album: any) {
    this.onAlbumClick.emit(album);
  }

}
