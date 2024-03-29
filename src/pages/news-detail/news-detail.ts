// Project Name: MultiPlacesApp
// Project URI: http://neowebsolution.com
// Author: NeoWebSolution Team
// Author URI: http://neowebsolution.com/
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';


@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html',
})
export class NewsDetailPage {
  post;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public config: ConfigProvider) {
    this.post = this.navParams.get('post');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsDetailPage');
  }

}
