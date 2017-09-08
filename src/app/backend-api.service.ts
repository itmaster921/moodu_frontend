import { Injectable, Inject } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs';
import { SpotifyUser } from './SpotifyUser';
import 'rxjs/add/operator/toPromise';

import { UserProfile } from './user-profile';
import { AccessTokenService } from './access-token.service';
import { Transfer, FileUploadResult, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

// export var BACKEND_API_URL: string = 'http://192.168.0.136';
export var BACKEND_API_URL: string = "http://35.167.143.161";

@Injectable()
export class BackendApiService {

    constructor(private http: Http,
        @Inject(BACKEND_API_URL) private apiUrl: string,
        private accessTokenService: AccessTokenService,
        private transfer: Transfer,
        private file: File) { }

    registerUser(userProfile: any): Observable<UserProfile> {
        const url: string = `${this.apiUrl}/api/user/create/`;
        const access_token: string = this.accessTokenService.getAccessToken();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + access_token);
        let options = new RequestOptions({ headers: headers });

        console.log("url is " + url);
        return this.http
            .post(url, JSON.stringify(userProfile), options)
            .map(res => res.json());
    }

    updateUser(user: any): Observable<UserProfile> {
        console.log("user is: " + JSON.stringify(user));
        const url: string = `${this.apiUrl}/api/user/update/`;
        const access_token: string = this.accessTokenService.getAccessToken();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + access_token);
        let options = new RequestOptions({ headers: headers });

        console.log("url is " + url);
        return this.http
            .post(url, JSON.stringify(user), options)
            .map((res: Response) => res.json())
            .catch((error: any) => this.handleError(error));
    }

    getCookie(name) {
        console.log('cookie is: ', document.cookie);
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        if (parts.length == 2) {
            return parts.pop().split(";").shift();
        }
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', JSON.stringify(error)); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getSpotifyUserByAccessToken(access_token: string): Observable<SpotifyUser> {
        let spotifyUserEndpoint = `${this.apiUrl}/api/spotify/me?access_token=${access_token}`;
        console.log('making a call to ' + spotifyUserEndpoint);
        return this.http.get(spotifyUserEndpoint)
            .map(res => res.json());
    }

    getUser(spotify_id: string): Observable<UserProfile> {
        //         POST /user_profile/
        // HTTP 201 Created
        // Allow: GET, POST, HEAD, OPTIONS
        // Content-Type: application/json
        // Vary: Accept

        // {
        //     "user": "http://localhost:8000/users/1/",
        //     "gender": "M",
        //     "birthday": "2016-10-11",
        //     "first_name": "Kelly",
        //     "last_name": "Nicholes",
        //     "spotify_id": "Spotify_id",
        //     "location": "Utah",
        //     "access_token": "lkajdsflkjasdklfj",
        //     "refresh_token": "refresh_token_asdlkfjasdf"
        // }


        let userEndpoint = `${this.apiUrl}/api/user/${spotify_id}`;
        const access_token: string = this.accessTokenService.getAccessToken();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + access_token);
        let options = new RequestOptions({ headers: headers });
        console.log('making a call to ' + userEndpoint);
        return this.http.get(userEndpoint, options)
            .map((response: Response) => {
                return response.json();
            });
    }

    uploadProfilePicture(uri: string): Promise<FileUploadResult> {
        let endpoint = `${this.apiUrl}/api/profile-picture`;
        const fileTransfer = new Transfer();
        var ft: Promise<FileUploadResult>;
        const access_token: string = this.accessTokenService.getAccessToken();
        let headers = new Headers({ 'Authorization': 'Bearer ' + access_token });


        let options = {
            fileKey: 'file',
            fileName: 'name.jpg',
            mimeType: 'image/jpeg',
            headers: headers,
            chunkedMode: false,
            params: {
                fileName: 'name.jpg'
            }
        };

        try {
            const fileTransfer: TransferObject = this.transfer.create();
            ft = fileTransfer.upload(uri, endpoint, options);
        }
        catch (err) {
            console.log("failed to upload file");
        }
        return ft
    }

    uploadProfileBackgroundPicture(uri: string): Promise<FileUploadResult> {
        let endpoint = `${this.apiUrl}/api/profile-background-picture`;
        const fileTransfer: TransferObject = this.transfer.create();
        var ft: Promise<FileUploadResult>;
        const access_token: string = this.accessTokenService.getAccessToken();
        let headers = new Headers({ 'Authorization': 'Bearer ' + access_token });

        let options = {
            fileKey: 'file',
            fileName: 'name.jpg',
            mimeType: 'image/jpeg',
            headers: headers,
            chunkedMode: false,
            params: {
                fileName: 'name.jpg'
            }
        };

        try {
            ft = fileTransfer.upload(uri, endpoint, options);
        }
        catch (err) {
            console.log("failed to upload file");
        }
        return ft
    }


    uploadPicture(uri: string): Promise<FileUploadResult> {
        let endpoint = `${this.apiUrl}/api/upload-picture`;
        const fileTransfer: TransferObject = this.transfer.create();
        var ft: Promise<FileUploadResult>;
        const access_token: string = this.accessTokenService.getAccessToken();
        let headers = new Headers({ 'Authorization': 'Bearer ' + access_token });

        let options = {
            fileKey: 'file',
            fileName: 'name.jpg',
            mimeType: 'image/jpeg',
            headers: headers,
            chunkedMode: false,
            params: {
                fileName: 'name.jpg'
            }
        };

        try {
            ft = fileTransfer.upload(uri, endpoint, options);
        }
        catch (err) {
            console.log("failed to upload file");
        }
        return ft
    }

    getFilename(uri) {
        var lastSlashIdx = uri.lastIndexOf('/') + 1;
        var questionMarkIdx = uri.lastIndexOf('?') == -1 ? uri.length : uri.lastIndexOf('?');
        var filename = uri.substring(lastSlashIdx, questionMarkIdx);
        return filename;
    }
    /**
     * file:///storage/emulated/0/Android/data/com.ionicframework.syncfrontend191727/cache/IMG_20170215_171323.jpg?1487204003877
     * file:///storage/emulated/0/Android/data/com.ionicframework.syncfrontend191727/cache/1487207294460.jpg
     * /storage/emulated/0/DCIM/Camera/VID_20170214_192554.mp4
     * 
     * 
     */
    savePlaylist(playlist: any, songs: any[], profiles: any[]): Observable<any> {
        const endpoint: string = `${this.apiUrl}/api/music/playlist/`;
        console.log("trying to save playlist.", JSON.stringify(playlist));
        console.log("And the profiles are:", profiles);
        let uri = playlist.image || playlist.video || '';
        let user_fks = this.getProfileForeignKeys(profiles);
        console.log("profile_fks", user_fks);
        let params = {
                    title: playlist['title'],
                    message: playlist['message'],
                    locked: playlist['locked'],
                    public: playlist['public'],
                    latitude: playlist['latitude'],
                    longitude: playlist['longitude'],
                    songs: songs,
                    profiles: profiles,
                    user_fks: user_fks
                };
        if (uri != '') {
            const fileTransfer: TransferObject = this.transfer.create();
            var ft: Promise<FileUploadResult>;
            const access_token: string = this.accessTokenService.getAccessToken();
            let headers = new Headers({ 'Authorization': 'Bearer ' + access_token });
            let fileKey = playlist.image ? 'image' : 'video';
            let fileName = this.getFilename(uri);
            params['filename'] = fileName;
            let options = {
                fileKey: fileKey,
                fileName: fileName,
                mimeType: 'multipart/form-data',
                headers: headers,
                chunkedMode: false,
                params: params
            };


            console.log("about to send a file transfer of " + uri + " to " + endpoint + " with data:");
            console.log(JSON.stringify(options['params']));
            var ftobs = new Observable(observer => {
                try {
                    fileTransfer.upload(uri, endpoint, options)
                        .then((res) => {
                            console.log("file transfer complete.", res, JSON.stringify(res));
                            observer.next(res['response']);
                            observer.complete();
                        })
                        .catch((err) => {
                            console.log("file transfer failed.", JSON.stringify(err));
                        });

                }
                catch (err) {
                    // observer.onError('failed to save');
                    observer.complete();
                }
            });

            return ftobs;

        } else {
            const url: string = `${this.apiUrl}/api/music/playlist/`;
            const access_token: string = this.accessTokenService.getAccessToken();
            let headers = new Headers({ 'Content-Type': 'application/json' });
            headers.append('Authorization', 'Bearer ' + access_token);
            let options = new RequestOptions({ headers: headers});

            return this.http
                .post(url, params, options)
                .map((res: Response) => res.json())
                .catch((error: any) => this.handleError(error));
        }

    }

    getProfileForeignKeys(profiles: any[]){
        let ret = [];
        for(let i = 0; i < profiles.length; i++){
            ret.push(profiles[i]['user']['id'])
        }
        return ret;
    }

    getPlaylists() {
        console.log("getting playlists");
        const url: string = `${this.apiUrl}/api/music/playlist/`;
        const access_token: string = this.accessTokenService.getAccessToken();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + access_token);
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(url, options)
            .map((res: Response) => res.json())
            .catch((error: any) => this.handleError(error));
    }

    searchUser(query) {
        console.log("searching users");
        const url: string = `${this.apiUrl}/api/user/autocomplete`;
        const access_token: string = this.accessTokenService.getAccessToken();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + access_token);
        let options = new RequestOptions({ headers: headers });

        let params: URLSearchParams = new URLSearchParams();
        params.set("q", query);
        options.search = params;
        

        return this.http
            .get(url, options)
            .map((res: Response) => res.json())
            .catch((error: any) => this.handleError(error));
    }

    follow(followee_username) {
        console.log("about to follow ", followee_username);
        const url: string = `${this.apiUrl}/api/friendship/follower/add/${followee_username}/`;
        const access_token: string = this.accessTokenService.getAccessToken();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + access_token);
        let options = new RequestOptions({ headers: headers });

        return this.http
            .post(url, {}, options)
            .map((res: Response) => res.json())
            .catch((error: any) => this.handleError(error));
    }

    follows(followee_username) {
        console.log("checking if we follow ", followee_username);
        const url: string = `${this.apiUrl}/api/friendship/follower/follows/${followee_username}/`;
        const access_token: string = this.accessTokenService.getAccessToken();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + access_token);
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(url, options)
            .map((res: Response) => res.json())
            .catch((error: any) => this.handleError(error));
    }

    unfollow(followee_username) {
        console.log("about to unfollow ", followee_username);
        const url: string = `${this.apiUrl}/api/friendship/follower/remove/${followee_username}/`;
        const access_token: string = this.accessTokenService.getAccessToken();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + access_token);
        let options = new RequestOptions({ headers: headers });

        return this.http
            .post(url, {}, options)
            .map((res: Response) => res.json())
            .catch((error: any) => this.handleError(error));
    }

    getFollowCount(username) {
        console.log("getting follower counts for ", username);
        const url: string = `${this.apiUrl}/api/friendship/counts/${username}/`;
        const access_token: string = this.accessTokenService.getAccessToken();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + access_token);
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(url, options)
            .map((res: Response) => res.json())
            .catch((error: any) => this.handleError(error));
    }

    getFollowers(username) {
        console.log("checking followers of ", username);
        const url: string = `${this.apiUrl}/api/friendship/followers/${username}/`;
        const access_token: string = this.accessTokenService.getAccessToken();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + access_token);
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(url, options)
            .map((res: Response) => res.json())
            .catch((error: any) => this.handleError(error));
    }

    getUserFeed(username) {
        console.log("getting user feed of ", username);
        const url: string = `${this.apiUrl}/api/feed/user/${username}/`;
        const access_token: string = this.accessTokenService.getAccessToken();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + access_token);
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(url, options)
            .map((res: Response) => res.json())
            .catch((error: any) => this.handleError(error));
    }

    getNewsFeed(username) {
        console.log("checking followers of ", username);
        const url: string = `${this.apiUrl}/api/feed/timeline/${username}/`;
        const access_token: string = this.accessTokenService.getAccessToken();
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + access_token);
        let options = new RequestOptions({ headers: headers });

        return this.http
            .get(url, options)
            .map((res: Response) => res.json())
            .catch((error: any) => this.handleError(error));
    }
}

export var backendApiServiceInjectables: Array<any> = [
    { provide: BackendApiService, useClass: BackendApiService },
    { provide: BACKEND_API_URL, useValue: BACKEND_API_URL }
];
