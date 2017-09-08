import { Component, Input, Output, EventEmitter } from '@angular/core';

/*
  Generated class for the SongListItem component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'song-list-item',
  templateUrl: 'song-list-item.html'
})
export class SongListItemComponent {
  @Input('song') song: any;
  @Input('selected') selected: boolean;
  @Input('removable') removable: boolean;
  @Output() songRemove = new EventEmitter();
  @Output() songClicked= new EventEmitter();

  constructor() {
  }

  onRemove(){
    console.log("emitting songRemove event");
    this.songRemove.emit({
      song: this.song
    });
  }

  onClick(){
    this.songClicked.emit({
      song: this.song
    });
  }

}
