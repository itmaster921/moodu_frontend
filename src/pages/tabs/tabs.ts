import { Component } from '@angular/core';

import { HomeTabPage } from '../home-tab/home-tab';
import { SearchPage } from '../search/search';
import { NotificationPage } from '../notification/notification';
import { UserProfilePage } from '../user-profile/user-profile';
import { CreatePage } from '../create/create';
import { UserProfile } from '../../app/user-profile'
import { TrendingPlaylistsPage } from '../trending-playlists/trending-playlists';
import { NavigationService } from '../../providers/navigation-service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  activeTab : number = 0;
  tab1Root: any = HomeTabPage;
  // tab2Root: any = SearchPage;
  tab2Root: any = TrendingPlaylistsPage;
  tab3Root: any = CreatePage;
  tab4Root: any = NotificationPage;
  tab5Root: any = UserProfilePage;

  constructor(public navigationService : NavigationService) {
    navigationService.activeTab.subscribe((tabId)=>{
      this.activeTab = tabId;
    });
  }
}
