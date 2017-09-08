import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';
import { Transfer } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { Keyboard } from '@ionic-native/keyboard';
import { MediaCapture } from '@ionic-native/media-capture';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { EditProfileButton } from '../components/edit-profile-button/edit-profile-button';
import { FollowButtonComponent } from '../components/follow-button/follow-button';
import { PlaySongsPage } from '../pages/play-songs/play-songs';
import { TestPage } from '../pages/test-page/test-page';
import { NewsfeedTabsComponent } from '../components/newsfeed-tabs/newsfeed-tabs';
import { UserListSummaryComponent } from '../components/user-list-summary/user-list-summary';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { AddBackgroundPicture } from '../components/add-background-picture/add-background-picture';
import { UserProfileFollowerInfoComponent } from '../components/user-profile-follower-info/user-profile-follower-info';
import { UploadableProfilePicture } from '../components/uploadable-profile-picture/uploadable-profile-picture';
import { backendApiServiceInjectables } from './backend-api.service';
import { AccessTokenService } from './access-token.service';
import { CameraService } from '../providers/camera-service';
import { HttpModule } from '@angular/http';
import { SpotifyService } from '../providers/spotify-service';
import { FeedService } from '../providers/feed-service';
import { UserService } from '../providers/user-service';
import { PlaylistService } from '../providers/playlist-service';
import { NavigationService } from '../providers/navigation-service';
import { SpotifySearchModalService } from '../providers/spotify-search-modal-service';
import { UnicodeNamePipe } from '../pipes/unicode-name-pipe';
import { ArtistNamesPipe } from '../pipes/artist-names-pipe';
import { SpotifySearchComponent } from '../components/spotify-search-component/spotify-search-component';
import { UserSearchComponent } from '../components/user-search/user-search';
import { UserArtistSongSearchComponent } from '../components/user-artist-song-search/user-artist-song-search';

import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';
import { CreatePage } from '../pages/create/create';
import { HomeTabPage } from '../pages/home-tab/home-tab';
import { NotificationPage } from '../pages/notification/notification';
import { SongSelectPage } from '../pages/song-select/song-select';
import { SongDetailPage } from '../pages/song-detail/song-detail';


import { UserSelectPage } from '../pages/user-select/user-select';
import { TrendingPlaylistsPage } from '../pages/trending-playlists/trending-playlists';

import { CreateClipPage } from '../pages/create-clip/create-clip';
import { CreateMoodPage } from '../pages/create-mood/create-mood';
import { CreatePlaylistPage } from '../pages/create-playlist/create-playlist';
import { CreatePrescriptionPage } from '../pages/create-prescription/create-prescription';
import { CreateTrackPostPage } from '../pages/create-track-post/create-track-post';
import { ArtistProfilePage } from '../pages/artist-profile/artist-profile';
import { AlbumProfilePage } from '../pages/album-profile/album-profile';

import { LogoComponent } from '../components/logo/logo';
import { NewsfeedComponent } from '../components/newsfeed/newsfeed';
import { ProfilePictureComponent } from '../components/profile-picture/profile-picture';
import { UserPictureComponent } from '../components/user-picture/user-picture';
import { SongListItemComponent } from '../components/song-list-item/song-list-item';
import { SongListComponent } from '../components/song-list/song-list';
import { UserListItemComponent } from '../components/user-list-item/user-list-item';
import { UserListComponent } from '../components/user-list/user-list';
import { ArtistListComponent } from '../components/artist-list/artist-list';
import { AlbumListComponent } from '../components/album-list/album-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HomeTabPage,
    SignUpPage,
    UserProfilePage,
    UserProfileComponent,
    NewsfeedTabsComponent,
    UserListSummaryComponent,
    SearchPage,
    CreatePage,
    TabsPage,
    TrendingPlaylistsPage,
    NotificationPage,
    UserProfileFollowerInfoComponent,
    EditProfileButton,
    FollowButtonComponent,
    AddBackgroundPicture,
    UploadableProfilePicture,
    UnicodeNamePipe,
    ArtistNamesPipe,
    EditProfilePage,
    SpotifySearchComponent,
    UserSearchComponent,
    UserArtistSongSearchComponent,
    TestPage,
    ArtistProfilePage,
    AlbumProfilePage,
    CreateClipPage,
    CreateMoodPage,
    CreatePlaylistPage,
    CreatePrescriptionPage,
    CreateTrackPostPage,
    PlaySongsPage,
    SongSelectPage,
    SongDetailPage,
    UserSelectPage,
    LogoComponent,
    ProfilePictureComponent,
    SongListComponent,
    SongListItemComponent,
    UserListComponent,
    UserListItemComponent,
    UserPictureComponent,
    ArtistListComponent,
    AlbumListComponent,
    NewsfeedComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HomeTabPage,
    SignUpPage,
    SearchPage,
    CreatePage,
    TabsPage,
    EditProfilePage,
    UserProfilePage,
    NotificationPage,
    ArtistProfilePage,
    AlbumProfilePage,
    CreateClipPage,
    CreateMoodPage,
    CreatePlaylistPage,
    CreatePrescriptionPage,
    CreateTrackPostPage,
    PlaySongsPage,
    SongDetailPage,
    SongSelectPage,
    UserSelectPage,
    TestPage,
    TrendingPlaylistsPage
  ],
  providers: [backendApiServiceInjectables,
    AccessTokenService,
    CameraService,
    Camera,
    Crop,
    SpotifyService,
    FeedService,
    File,
    Keyboard,
    MediaCapture,
    SpotifySearchModalService,
    UserService,
    PlaylistService,
    NavigationService,
    StatusBar,
    SplashScreen,
    Transfer,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
