import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/map';

/*
  Generated class for the PlaylistService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PlaylistService {

  constructor(public http: Http) {
    console.log('Hello PlaylistService Provider');
  }

playlists: BehaviorSubject<any> = new BehaviorSubject<any>(null);

 public setPlaylists(playlists: any): void {
    this.playlists.next(playlists);
 }

}
