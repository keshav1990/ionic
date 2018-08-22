// Project Name: MultiEventsApp
// Project URI: http://neowebsolution.com
// Author: NeoWebSolution Team
// Author URI: http://neowebsolution.com/
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LoginPage } from '../login/login';
import { LoadingProvider } from '../../providers/loading/loading';



@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',  
}) 
export class EventDetailPage {
  public event;

  attributes = [];
  selectAttribute = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public config: ConfigProvider,
    public shared: SharedDataProvider,
    public modalCtrl: ModalController,
    public loading: LoadingProvider,
    private socialSharing: SocialSharing) {
 
    this.event = navParams.get('data');
   // console.log(this.event);
    

    if (this.event.attributes != null && this.event.attributes != undefined && this.event.attributes.length != 0) {
      //this.selectAttribute = this.event.attributes[0].values[0];
      // console.log(this.selectAttribute);
      this.event.attributes.forEach((value, index) => {
 console.log(value);
        var att = {
          events_options_id: value.event_option.id,
          events_options: value.event_option.name,
          events_options_values_id: value.values[0].id,
          events_options_values: value.values[0].value,
          name: value.values[0].value 
        };

        this.attributes.push(att);
      });
      //console.log(this.attributes);
    }

  }

  //============================================================================================  
  //function adding attibute into array
  fillAttributes = function (val, optionID) {

    //console.log(val);
  //  console.log(this.attributes);
    this.attributes.forEach((value, index) => {
      if (optionID == value.events_options_id) {
        value.events_options_values_id = val.id;
        value.events_options_values = val.value;
        value.name = val.value
      }
    });
    // console.log($scope.attributes);
   
    
  };
  //============================================================================================  
 


  checkEventNew() {
    var pDate = new Date(this.event.events_date_added);
    var date = pDate.getTime() + this.config.newEventDuration * 86400000;
    var todayDate = new Date().getTime();
    if (date > todayDate)
      return true;
    else
      return false
  }

 
  share() {
    this.loading.autoHide(1000);
    // Share via email
    this.socialSharing.share(
      this.event.events_name,
      this.event.events_name,
      this.config.url + this.event.events_image,
      this.event.events_url).then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });

  }
  
  


}
