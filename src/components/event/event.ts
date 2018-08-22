// Project Name: MultiEventsApp
// Project URI: http://neowebsolution.com
// Author: NeoWebSolution Team
// Author URI: http://neowebsolution.com/
import { Component, Input } from '@angular/core';
import { ConfigProvider } from '../../providers/config/config';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { EventDetailPage } from '../../pages/event-detail/event-detail';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'event',
  templateUrl: 'event.html'
})
export class EventComponent {

  @Input('data') p;//event data
  @Input('type') type;
  // @Output() someEvent = new EventEmitter();
  constructor(
    public config: ConfigProvider,
    public shared: SharedDataProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public events: Events
  ) {
    events.subscribe('wishListUpdate', (id, value) => {
      if (this.p.events_id == id) this.p.isLiked = value
    });

  }

  
  
  showEventDetail() {
    this.navCtrl.push(EventDetailPage, { data: this.p });
    if (this.type != 'recent') this.shared.addToRecent(this.p);
  }

  checkEventNew() {
    var pDate = new Date(this.p.events_date_added);
    var date = pDate.getTime() + this.config.newEventDuration * 86400000;
    var todayDate = new Date().getTime();
    if (date > todayDate)
      return true;
    else
      return false
  }

  

  
  removeRecent() {
    this.shared.removeRecent(this.p);
  }

 


  ngOnChanges() {

  }

  ngOnInit() {

  }
}
