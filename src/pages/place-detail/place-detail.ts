// Project Name: MultiPlacesApp
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
  selector: 'page-place-detail',
  templateUrl: 'place-detail.html',
})
export class PlaceDetailPage {
  public place;

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

    this.place = navParams.get('data');
   //console.log(this.place);
    

    if (this.place.attributes != null && this.place.attributes != undefined && this.place.attributes.length != 0) {
      //this.selectAttribute = this.place.attributes[0].values[0];
      // console.log(this.selectAttribute);
      this.place.attributes.forEach((value, index) => {

        var att = {
			
          places_options_id: value.option.id,
          places_options: value.option.name,
          places_options_values_id: value.values[0].id,
          places_options_values: value.values[0].value,
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
      if (optionID == value.places_options_id) {
        value.places_options_values_id = val.id;
        value.places_options_values = val.value;
        value.name = val.value
      }
    });
    // console.log($scope.attributes);
   
    
  };
  //============================================================================================  
 


  checkPlaceNew() {
    var pDate = new Date(this.place.places_date_added);
    var date = pDate.getTime() + this.config.newPlaceDuration * 86400000;
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
      this.place.places_name,
      this.place.places_name,
      this.config.url + this.place.places_image,
      this.place.places_url).then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });

  }
  
  


}
