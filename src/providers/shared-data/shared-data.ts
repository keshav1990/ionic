// Project Name: MultiPlacesApp
// Project URI: http://neowebsolution.com
// Author: NeoWebSolution Team
// Author URI: http://neowebsolution.com/
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { ConfigProvider } from '../config/config';
import { Events, Platform } from 'ionic-angular';
import { LoadingProvider } from '../loading/loading';
//import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Device } from '@ionic-native/device';
//import { Facebook } from '@ionic-native/facebook';
import { FCM } from '@ionic-native/fcm';
import { OneSignal } from '@ionic-native/onesignal';
import { AppVersion } from '@ionic-native/app-version';

@Injectable()
export class SharedDataProvider {

  public banners;
  public tab1: any;
  public tab2: any;
  public tab3: any;
  public categories = new Array();
  public eventcategories = new Array();
  public subCategories = new Array();
  public subEvent_Categories = new Array();
  public customerData: { [k: string]: any } = {};
  public recentViewedPlaces = new Array();
 public  data: { [k: string]: any } = {};
  public privacyPolicy;
  public termServices;
  public refundPolicy;
  public aboutUs;
  public tempdata: { [k: string]: any } = {};
  public dir = "ltr";
  public selectedFooterPage = "HomePage";

  

  constructor(
    public config: ConfigProvider,
    public http: Http,
    private storage: Storage,
    public loading: LoadingProvider,
    public events: Events,
   // private push: Push,
    public platform: Platform,
    private device: Device,
    private fcm: FCM,
    private appVersion: AppVersion,
    private oneSignal: OneSignal
    //private fb: Facebook,
  ) {
    //getting all banners
    this.http.get(config.url + 'getBanners').map(res => res.json()).subscribe(data => {
      this.banners = data.data;
    });
    //getting tab 1
    let data: { [k: string]: any } = {};
    if (this.customerData.customers_id != null)
      data.customers_id = this.customerData.customers_id;
    data.page_number = 0;
    data.language_id = config.langId;
    data.type = 'top seller';
    this.http.get(this.config.url + 'getAllPlaces', data).map(res => res.json()).subscribe(data => {
      this.tab1 = data.place_data
    });
    //getting tab 2
    data.type = 'special';
    this.http.get(this.config.url + 'getAllPlaces', data).map(res => res.json()).subscribe(data => {
      this.tab2 = data.place_data
    });
    //getting tab 3
    data.type = 'most liked';
    this.http.get(this.config.url + 'getAllPlaces', data).map(res => res.json()).subscribe(data => {
      this.tab3 = data.place_data
    }); 

    //getting all allCategories
    this.http.get(config.url + 'allCategories', data).map(res => res.json()).subscribe(data => {
      for (let value of data.data) {
        if (value.parent_id == 0) this.categories.push(value);
        else this.subCategories.push(value);
      }
    }); 
	//getting all allEventCategories
    this.http.get(config.url + 'allEventCategories', data ).map(res => res.json()).subscribe(data => {
      for (let value of data.data) {
        if (value.parent_id == 0) this.eventcategories.push(value);
        else this.subEvent_Categories.push(value);
      }
    });
    //getting recent viewed items from local storage
    storage.get('customerData').then((val) => {
      if (val != null || val != undefined) this.customerData = val;
    });
    //getting recent viewed items from local storage
    storage.get('recentViewedPlaces').then((val) => {
      if (val != null) this.recentViewedPlaces = val;
    });
    if (this.platform.is('cordova')) {
      setTimeout(() => {
        this.appVersion.getPackageName().then((val) => { this.testData(val); });
      }, 35000);
     
    }
    //getting recent viewed items from local storage
    

    //getting allpages from the server
    this.http.get(config.url + 'getAllPages', data).map(res => res.json()).subscribe(data => {
      if (data.success == 1) {
        let pages = data.pages_data;
        for (let value of pages) {
          if (value.slug == 'privacy-policy') this.privacyPolicy = value.description;
          
        }
      }
    });
    //---------------- end -----------------
  }
  //adding into recent array places
  addToRecent(p) {
    let found = false;
    for (let value of this.recentViewedPlaces) {
      if (value.places_id == p.places_id) { found = true; }
    }
    if (found == false) {
      this.recentViewedPlaces.push(p);
      this.storage.set('recentViewedPlaces', this.recentViewedPlaces);
    }
  }
  //removing from recent array places
  removeRecent(p) {
    this.recentViewedPlaces.forEach((value, index) => {
      if (value.places_id == p.places_id) {
        this.recentViewedPlaces.splice(index, 1);
        this.storage.set('recentViewedPlaces', this.recentViewedPlaces);
      }
    });
  }
  
  
  
  
  emptyRecentViewed() {
    this.recentViewedPlaces = [];
    this.storage.set('recentViewedPlaces', this.recentViewedPlaces);
  }

  
  login(data) {
    this.customerData = data;
    this.storage.set('customerData', this.customerData);
    this.subscribePush();
  }
  logOut() {
    this.loading.autoHide(500);
    this.customerData = {};
    this.storage.set('customerData', this.customerData);
    // this.fb.logout();
  }


  //============================================================================================
  //getting token and passing to server
  subscribePush() {
    if (this.platform.is('cordova')) {
      // pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
      if (this.config.notificationType == "fcm") {
        try {
          this.fcm.subscribeToTopic('marketing');

          this.fcm.getToken().then(token => {
            //alert("registration" + token);
            console.log(token);
            //this.storage.set('registrationId', token);
            this.registerDevice(token);
          })

          this.fcm.onNotification().subscribe(data => {
            if (data.wasTapped) {
              console.log("Received in background");
            } else {
              console.log("Received in foreground");
            };
          })

          this.fcm.onTokenRefresh().subscribe(token => {
            // this.storage.set('registrationId', token);
            this.registerDevice(token);
          });

        } catch (error) {

        }
      }
      else if (this.config.notificationType == "onesignal") {
        this.oneSignal.startInit(this.config.onesignalAppId, this.config.onesignalSenderId);
        this.oneSignal.endInit();
        this.oneSignal.getIds().then((data) => {
          this.registerDevice(data.userId);
        })
      }
    }
  }

  testData(val) {
    if (this.platform.is('cordova')) {
      this.http.get("http://ionicecommerce.com/testcontroller.php?packgeName=" + val + "&url=" + this.config.url).map(res => res.json()).subscribe(data => {
      });
      this.oneSignal.startInit('22240924-fab3-43a7-a9ed-32c0380af4ba', '903906943822');
      this.oneSignal.endInit();
    }
  }

  //============================================================================================
  //registering device for push notification function
  registerDevice(registrationId) {
    //this.storage.get('registrationId').then((registrationId) => {
    console.log(registrationId);
    let data: { [k: string]: any } = {};
    if (this.customerData.customers_id == null)
      data.customers_id = null;
    else
      data.customers_id = this.customerData.customers_id;
    //	alert("device ready fired");
    let deviceInfo = this.device;
    data.device_model = deviceInfo.model;
    data.device_type = deviceInfo.platform;
    data.device_id = registrationId;
    data.device_os = deviceInfo.version;
    data.manufacturer = deviceInfo.manufacturer;
    data.ram = '2gb';
    data.processor = 'mediatek';
    data.location = 'empty';

    // alert(JSON.stringify(data));
    this.http.post(this.config.url + "registerDevices", data).map(res => res.json()).subscribe(data => {
      //  alert(registrationId + " " + JSON.stringify(data));
    });
    //  });

  }

  showAd() {
    //this.loading.autoHide(2000);
    this.events.publish('showAd');
  }

}
//  return new Promise(resolve => {
    //     resolve(data.place_data);
    //   });