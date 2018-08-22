// Project Name: MultiPlacesApp
// Project URI: http://neowebsolution.com
// Author: NeoWebSolution Team
// Author URI: http://neowebsolution.com/
import { Component, Input } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { SearchPage } from '../../pages/search/search';
import { EventSearchPage } from '../../pages/event-search/event-search';
import { SettingsPage } from '../../pages/settings/settings';
import { EventsPage } from '../../pages/events/events';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { trigger, style, animate, transition, state } from '@angular/animations';
 
@Component({
  selector: 'header',
  animations: [
    
  ],
  templateUrl: 'header.html',

})
export class HeaderComponent {

  @Input('title') title;
  page;
  leftButtons = true;
  rightButtons = true;
  searchButton = true;
  closeButtonRight = false;
  
  

  constructor(
    public navCtrl: NavController,
    public shared: SharedDataProvider,
    public events: Events

  ) {
    // console.log(navCtrl);


  }
  
  openSearch() {
    if (this.title != 'Search')
      this.navCtrl.push(SearchPage);
  }
  openEventSearch() {
    if (this.title != 'Search')
      this.navCtrl.push( EventSearchPage);
  }
  openSettings() {
    if (this.title != 'settings')
      this.navCtrl.push(SettingsPage);
  }
  
  openEventsPage() {
    if (this.title != 'event')
      this.navCtrl.push(EventsPage);
  }
  openHomePage() {
    this.navCtrl.popToRoot();
  }

  ngOnChanges() {
    //console.log(this.navCtrl.getActive());
    this.page = this.title;

      if (this.page == 'Search' || this.page == 'event_Search') {
      //console.log("searchButton" + this.searchButton)
      this.leftButtons = false;
      this.searchButton = false;
    }
    
    else {
      this.leftButtons = true;
      this.rightButtons = true;
    }
  }
}
