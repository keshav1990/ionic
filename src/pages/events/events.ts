// Project Name: MultiEventsApp
// Project URI: http://neowebsolution.com
// Author: NeoWebSolution Team
// Author URI: http://neowebsolution.com/
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, InfiniteScroll, Content, ActionSheetController, Slides } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { Http } from '@angular/http';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { LoadingProvider } from '../../providers/loading/loading';
import { TranslateService } from '@ngx-translate/core';
import { share } from 'rxjs/operator/share';
import { SearchPage } from '../search/search';
import { EventSearchPage } from '../event-search/event-search';
import { SettingsPage } from '../settings/settings';
import { Toast } from '@ionic-native/toast'; 

@Component({
  selector: 'page-events',
  templateUrl: 'events.html', 
})
export class EventsPage {
  @ViewChild(Content) content: Content;
  @ViewChild(Slides) slides: Slides;
  scrollTopButton = false;

  @ViewChild(InfiniteScroll) infinite: InfiniteScroll;
  mainurl : string;
  events = new Array;
  selectedTab = '';
  categoryId = '';
  categoryName = '';
  sortOrder = 'newest';
  sortArray = ['Newest', 'A - Z', 'Z - A', 'Special Events', 'Most Liked'];
  page = 0;
  applyFilter = false;
  filters = [];
  selectedFilters = [];
  maxAmount = 500;
  side = "right";
  eventView = 'grid';
 
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public config: ConfigProvider,
    public shared: SharedDataProvider,
    public loading: LoadingProvider,
    public translate: TranslateService,
    public http: Http,
	  private toast: Toast,
    public actionSheet: ActionSheetController) {

    if (shared.dir == "rtl") this.side = "left";

    if (this.navParams.get('id') != undefined) this.selectedTab = this.categoryId = this.navParams.get('id');
    if (this.navParams.get('name') != undefined) this.categoryName = this.navParams.get('name');
    if (this.navParams.get('sortOrder') != undefined) this.sortOrder = this.navParams.get('sortOrder');
    this.getEvents(null);
    this.getFilters(this.categoryId);



  }

  getEvents(infiniteScroll) {

    if (this.page == 0) { this.loading.show(); }
    var data: { [k: string]: any } = {};
    if (this.shared.customerData != null)//in case user is logged in customer id will be send to the server to get user liked events
      data.customers_id = this.shared.customerData.customers_id;
	  data.filters = '';
    if (this.applyFilter == true) {
      data.filters = this.selectedFilters;
      
    }
    data.categories_id = this.selectedTab;
    data.page_number = this.page;
    data.type = this.sortOrder;
    data.language_id = this.config.langId;
	
	var urlString = 'getAllEvents?filters='+data.filters+'&categories_id='+data.categories_id+'&customers_id='+data.customers_id+'&page_number='+data.page_number+'&type='+data.type+'&language_id='+data.language_id+'';
	
    this.http.get(this.config.url+ urlString, data).map(res => res.json()).subscribe(data => {
      // console.log(data.event_data.length + "   " + this.page);
      this.infinite.complete();
      if (this.page == 0) { this.events = new Array; this.loading.hide(); this.scrollToTop(); }
      if (data.success == 1) {
        this.page++;
        var prod = data.event_data;  
		//console.log(prod);
		this.mainurl = this.config.url;
        for (let value of prod) {
          this.events.push(value);
        }
      }
	  
	   if (data.event_data.length < 9) {// if we get less than 10 places then infinite scroll will de disabled

        this.infinite.enable(false);//disabling infinite scroll
         this.toast.show('All Events Loaded!', 'short', 'bottom');
      }
      if (data.success == 1 && data.event_data.length == 0) { this.infinite.enable(false); }
      if (data.success == 0) { this.infinite.enable(false); }

    });

  }

  //changing tab
  changeTab(c) { 
    this.applyFilter = true;
    this.infinite.enable(true);
    this.page = 0;
    if (c == '') this.selectedTab = c
    else this.selectedTab = c.id;
    this.getEvents(null);
    this.getFilters(this.selectedTab);
  }

  //============================================================================================  
  // filling filter array for keyword search 
  fillFilterArray = function (fValue, fName, keyword) {
    if (fValue._value == true) {
      this.selectedFilters.push({ 'name': fName, 'value': keyword });
    }
    else {
      this.selectedFilters.forEach((value, index) => {
        if (value.value == keyword) {
          this.selectedFilters.splice(index, 1);
        }
      });
    } //console.log(this.selectedFilters);
  };
  //============================================================================================  
  //getting countries from server
  getFilters = function (id) {
    var data: { [k: string]: any } = {};
    data.categories_id = id;
    data.language_id = this.config.langId;
    this.http.get(this.config.url + 'getEventFilters', data).map(res => res.json()).subscribe(data => {
      //  console.log(data);
      if (data.success == 1)
        this.filters = data.filters;
      
    });
  };
  applyFilters() {
    this.applyFilter = true;
    this.infinite.enable(true);
    this.page = 0;
    this.getEvents(null);
  }
  resetFilters() {
    this.getFilters(this.selectedTab);
  }
  removeFilters() {
    this.applyFilter = false;
    this.infinite.enable(true);
    this.page = 0;
    this.getEvents(null);
    this.getFilters(this.selectedTab);

  }
  ionViewDidEnter() {
    //this.event = this.navParams.get('data');
  }
  ngOnChanges() {

  }

  getSortEvents(value) {

    if (value == 'Newest') value = 'newest';
    else if (value == 'A - Z') value = 'a to z';
    else if (value == 'Z - A') value = 'z to a';
    else if (value == 'Top Seller') value = 'top seller';
    else if (value == 'Special Events') value = 'special';
    else if (value == 'Most Liked') value = 'most liked';
    else value = value;

    //console.log(value);
    if (value == this.sortOrder) return 0;
    else {
      this.sortOrder = value;
      this.infinite.enable(true);
      this.page = 0;
      this.getEvents(null);
    }
  }

  openSortBy() {
    var buttonArray = [];
    this.translate.get(this.sortArray).subscribe((res) => {

      for (let key in res) {
        buttonArray.push({ text: res[key], handler: () => { this.getSortEvents(key) } });
      }
      buttonArray.push(
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      );

      var actionSheet = this.actionSheet.create({
        buttons: buttonArray
      });
      actionSheet.present();
    });


  }
  changeLayout() {
    if (this.eventView == 'list') this.eventView = "grid";
    else this.eventView = "list";

    this.scrollToTop();
  }

  scrollToTop() {
    this.content.scrollToTop(700);
    this.scrollTopButton = false;
  }
  onScroll(e) {
    if (e.scrollTop >= 1200) this.scrollTopButton = true;
    if (e.scrollTop < 1200) this.scrollTopButton = false;
    //else this.scrollTopButton=false;
    //   console.log(e);
  }
  
  
  
  ionViewDidLoad() {
    // console.log("loaded");

    try {
      setTimeout(() => {
        let ind = 0;
        this.shared.eventcategories.forEach((value, index) => {
          if (this.selectedTab == value.id) { ind = index; }
		  console.log(ind);
        });
        //this.slides.slideTo(ind, 1000, true);
      }, 100);
			} catch (error) {

    }
  }
  
  
  openEventSearch() {
      this.navCtrl.push(EventSearchPage);
  }
  openSettings() {
      this.navCtrl.push(SettingsPage);
  }
  
  
}
