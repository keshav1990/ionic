// Project Name: MultiPlacesApp
// Project URI: http://neowebsolution.com
// Author: NeoWebSolution Team
// Author URI: http://neowebsolution.com/
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';

import { ConfigProvider } from '../../providers/config/config';




@Component({
  selector: 'page-thank-you',
  templateUrl: 'thank-you.html',
})
export class ThankYouPage {
  array = new Array;
  constructor(
    public navCtrl: NavController,
    public shared: SharedDataProvider,
    public config: ConfigProvider,
     public navParams: NavParams) {
    this.array = this.navCtrl.getViews();
  }
  openHome() {
    if (this.config.homePage == 1) { this.navCtrl.setRoot(HomePage); }
    
  }
 

  ionViewDidLoad() {
   

  }
 
  openSearch() {
    this.navCtrl.push(SearchPage);
  }
  ionViewWillEnter() {
    if (this.config.admob == 1) this.shared.showAd();
  }
}
