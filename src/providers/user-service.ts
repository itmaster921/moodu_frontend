import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {BehaviorSubject} from 'rxjs';
import { UserProfile } from '../app/user-profile';
 
import 'rxjs/add/operator/map';

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {

currentUser: BehaviorSubject<UserProfile> = new BehaviorSubject<UserProfile>(null);
profileUser: BehaviorSubject<UserProfile> = new BehaviorSubject<UserProfile>(null);

 public setCurrentUser(newUser: UserProfile): void {
   console.log("setting new user", JSON.stringify(newUser));
    this.currentUser.next(newUser);
 }

 public setProfileUser(newUser: UserProfile): void {
   console.log("setting new profile user", JSON.stringify(newUser));
    this.profileUser.next(newUser);
 }

  constructor(public http: Http) {
    console.log('Hello UserService Provider');
  }

}
