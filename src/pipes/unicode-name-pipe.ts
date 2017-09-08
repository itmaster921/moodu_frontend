import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the UnicodeNamePipe pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'unicodeNamePipe'
})
@Injectable()
export class UnicodeNamePipe {
  /*
    Takes unicode values from Django responses and returns contents.
   */
  transform(value) {
    value = value + ''; // make sure it's a string
    let result = /\(u'(\w+)',\)/.exec(value);
    if (result != null){
      value = result[1];
    }
    return value;
  }
}
