import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/Rx';

import { AccessTokenService } from '../app/access-token.service';
/**
 * SpotifyService works querying the Spotify Web API
 * https://developer.spotify.com/web-api/
 */

@Injectable()
export class SpotifyService {
  static BASE_URL: string = 'https://api.spotify.com/v1';

  constructor(private http: Http, private accessTokenService: AccessTokenService) {
  }

  query(URL: string, params?: Array<string>): Observable<any[]> {
    let queryURL: string = `${SpotifyService.BASE_URL}${URL}`;
    
    if (params) {
      queryURL = `${queryURL}?${params.join('&')}`;
    }

    let accessToken = this.accessTokenService.getAccessToken();
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + accessToken);
    let options = new RequestOptions({ headers: headers });
    return this.http.request(queryURL, options).map((res: any) => {
      return res.json();
    });
  }

  search(query: string, type: string, limit: number): Observable<any[]> {
    return this.query(`/search`, [
      `q=${query}`,
      `type=${type}`,
      `limit=${limit}`
    ]);
  }

  searchArtist(query: string): Observable<any[]> {
    return this.search(query, 'artist', 3);
  }

  searchAlbum(query: string): Observable<any[]> {
    return this.search(query, 'album', 3);
  }
  searchTrack(query: string): Observable<any[]> {
    return this.search(query, 'track', 20);
  }

  getTrack(id: string): Observable<any[]> {
    return this.query(`/tracks/${id}`);
  }

  getArtist(id: string): Observable<any[]> {
    return this.query(`/artists/${id}`);
  }

  getAlbum(id: string): Observable<any[]> {
    return this.query(`/albums/${id}`);
  }

  getArtistAlbums(id: string): Observable<any[]> {
    return this.query(`/artists/${id}/albums`, ['market=US']);
  }
}

export var SPOTIFY_PROVIDERS: Array<any> = [
  {provide: SpotifyService, useClass: SpotifyService}
];
