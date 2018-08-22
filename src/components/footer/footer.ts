// Project Name: MultiPlacesApp
// Project URI: http://neowebsolution.com
// Author: NeoWebSolution Team
// Author URI: http://neowebsolution.com/
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';
import { NewsPage } from '../../pages/news/news';
//import { AboutUsPage } from '../../pages/about-us/about-us';
import { GroupsPage } from '../../pages/groups/groups';
import { EventsPage } from '../../pages/events/events';
//import { ContactUsPage } from '../../pages/contact-us/contact-us';
import { SettingsPage } from '../../pages/settings/settings';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
//import { share } from 'rxjs/operator/share';
import { ConfigProvider } from '../../providers/config/config';




@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})
export class FooterComponent {
  segments: any = 'HomePage';
  constructor(
    public navCtrl: NavController,
    public shared: SharedDataProvider,
    public config: ConfigProvider,
  ) {
    // console.log(shared.selectedFooterPage);
    this.segments = shared.selectedFooterPage;
  }
  openPage(page) {
    this.shared.selectedFooterPage = page;

    if (page == "HomePage") { this.openHomePage(); }
    else if (page == "EventsPage") { this.navCtrl.setRoot(EventsPage); }  
    else if (page == "NewsPage") { this.navCtrl.setRoot(NewsPage); }  
    //else if (page == "AboutUsPage") { this.navCtrl.setRoot(AboutUsPage); }
    else if (page == "GroupsPage") { this.navCtrl.setRoot(GroupsPage); }
    //else if (page == "ContactUsPage") { this.navCtrl.setRoot(ContactUsPage); }
	else if (page == "SettingsPage") { this.navCtrl.setRoot(SettingsPage); }
  }
  openHomePage() {
    if (this.config.homePage == 1) { this.navCtrl.setRoot(HomePage); }
    
  }
  
}

// events.subscribe('footerPageChange', (value) => {
//   console.log(value);
//   this.segments = value;
// });
// this.events.publish('footerPageChange',page);
