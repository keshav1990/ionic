// Project Name: MultiPlacesApp
// Project URI: http://neowebsolution.com
// Author: NeoWebSolution Team
// Author URI: http://neowebsolution.com/
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'page-privacy-policy',
  templateUrl: 'privacy-policy.html',
})
export class PrivacyPolicyPage {

  constructor(
    public viewCtrl: ViewController,
  
    public sharedData: SharedDataProvider,
    translate: TranslateService,) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


}
