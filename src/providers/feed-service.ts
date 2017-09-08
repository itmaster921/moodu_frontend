import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/map';

/*
  Generated class for the FeedService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FeedService {
  userFeed: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  newsFeed: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  public setUserFeed(feed: any) : void {
    this.userFeed.next(feed);
  }
  
  public setNewsFeed(feed: any) : void {
    this.newsFeed.next(feed);
  }

  constructor(public http: Http) {
  }

}
