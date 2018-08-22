// Project Name: MultiPlacesApp
// Project URI: http://neowebsolution.com
// Author: NeoWebSolution Team
// Author URI: http://neowebsolution.com/
import { Component } from '@angular/core';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { ConfigProvider } from '../../providers/config/config';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
//import { EventsPage } from '../../pages/events/events';
import { Http } from '@angular/http';
import { LoadingProvider } from '../../providers/loading/loading';
import { PlaceDetailPage } from '../../pages/place-detail/place-detail';
//import { EventDetailPage } from '../../pages/event-detail/event-detail';

@Component({
  selector: 'banners',
  templateUrl: 'banners.html'
})
export class BannersComponent {

  constructor(
    public shared: SharedDataProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public config: ConfigProvider,
    public http: Http,
    public loading: LoadingProvider,
  ) {

  }
  //===============================================================================================
  //on click image banners
  bannerClick = function (image) {
    //  console.log(image);
    if (image.type == 'category') {
      this.navCtrl.push(HomePage, { id: parseInt(image.url) });
    }
    else if (image.type == 'place') {
      this.getSinglePlaceDetail(parseInt(image.url));
    }
    else {
      this.navCtrl.push(HomePage, { sortOrder: image.type });
    }
  }
  //===============================================================================================
  //getting single place data
  getSinglePlaceDetail(id) {
    this.loading.show();

    var data: { [k: string]: any } = {};
    if (this.shared.customerData != null)
      data.customers_id = this.shared.customerData.customers_id;
    else
      data.customers_id = null;
    data.places_id = id;
    data.language_id = this.config.langId;
    this.http.get(this.config.url + 'getAllPlaces', data).map(res => res.json()).subscribe(data => {
      this.loading.hide();
      if (data.success == 1) {
        this.navCtrl.push(PlaceDetailPage, { data: data.place_data[0] });
      }
    });
  }
  
 

}
