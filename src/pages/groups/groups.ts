import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { SearchPage } from '../search/search';
import { SettingsPage } from '../settings/settings';
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html'
})
export class GroupsPage {

  constructor(public navCtrl: NavController, public config: ConfigProvider) {

  }
  
  openSearch() {
      this.navCtrl.push(SearchPage);
  }
  openSettings() {
      this.navCtrl.push(SettingsPage);
  }

}


