import { Component, Input, Output, EventEmitter } from '@angular/core';

import * as _ from 'lodash';

/*
  Generated class for the SongList component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'song-list',
  templateUrl: 'song-list.html'
})
export class SongListComponent {
  // Songs to display in the list
  @Input('songs') songs: any[];
  @Input('header') header: string;
  // Whether or not to show a checkmark when clicked
  @Input('selectable') selectable: boolean;
  // whether or not to show an "x" to remove item from list
  @Input('removable') removable: boolean;
  /* Songs that have been selected
  * Used for tracking which songs to mark as selected
  * When display search results.
  */
  @Input('selectedSongs') selectedSongs: {};
  @Output() songClicked = new EventEmitter();

  constructor() {
    this.selectedSongs = this.selectedSongs || {};
    console.log("Songs:", this.songs);
  }

  clickedOnSong(song: any, event): void {
    console.log("clicked on song");
    this.songClicked.emit({
      song: song
    });
    //Check if the event target is the close button or not.
    if(event.target.className.indexOf('remove-button') > -1){
      console.log("close button clicked");
      this.removeSong(song);
      return;
    }
    if(this.selectable != true){
      return;
    }
    if (this.isSelected(song)) {
      this.deselectSong(song);
    }
    else{
      this.selectSong(song);
    }  
  }

  isSelected(song: any):any {
    let selected = this.selectedSongs[song.id] != undefined;
    return selected;
  }

  selectSong(song: any):void{
    this.selectedSongs[song.id] = song;
  }

  deselectSong(song: any):void{
    let clone = _.cloneDeep(this.selectedSongs);
    delete clone[song.id];
    this.selectedSongs = clone;
  }

  removeSong(song: any):void{
    this.deselectSong(song);
    _.remove(this.songs, function(currentObject) {
        return currentObject.id === song.id;
    });
  }

  removeFired(event) {
    this.removeSong(event.song);
  }

}
