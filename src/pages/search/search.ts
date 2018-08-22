// Project Name: MultiPlacesApp
// Project URI: http://neowebsolution.com
// Author: NeoWebSolution Team
// Author URI: http://neowebsolution.com/
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { Http } from '@angular/http';
import { AlertProvider } from '../../providers/alert/alert';
import { LoadingProvider } from '../../providers/loading/loading';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { HomePage } from '../home/home';


 
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  search;
  searchResult = [];
  showCategories = true;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public config: ConfigProvider,
    public http: Http,
    public alert: AlertProvider,
    public loading: LoadingProvider,
    public shared: SharedDataProvider,
  ) {
  }
  

  onChangeKeyword = function (e) {
    //console.log(this.search);
    // if (search != undefined) {
    //rchResult = [];
    //  }
  }
  getSearchData = function () {

    if (this.search != undefined) {
      if (this.search == null || this.search == '') {
        this.alert.show("Please enter something ");
        return 0;
      }
    }
    else {
      this.alert.show("Please enter something ");
      return 0;
    }
    this.loading.show();
    this.http.get(this.config.url + 'getSearchData', { 'searchValue': this.search }).map(res => res.json()).subscribe(data => {
      this.loading.hide();
      if (data.success == 1) {
        this.searchResult = data.place_data;
        this.showCategories = false;
      }
      if (data.success == 0) {
        this.alert.show(data.message);
      }
    });
  };

  openPlaces(id, name) {
    this.navCtrl.push(HomePage, { id: id, name: name, sortOrder: 'newest' });
  }
 
}
