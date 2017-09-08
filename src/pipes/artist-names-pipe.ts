import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the ArtistNames pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'artistNames'
})
@Injectable()
export class ArtistNamesPipe {
  /*
    Takes an album and returns a string with
    all artist names.
    value is a spotify album.
   */
  transform(value) {
    let artistArray = [];
    for(let i=0; i<value.artists.length; i++){
      artistArray.push(value.artists[i].name)
    }
    return artistArray.join(', ');
  }
}
