// Project Name: MultiPlacesApp
// Project URI: http://neowebsolution.com
// Author: NeoWebSolution Team
// Author URI: http://neowebsolution.com/
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConfigProvider } from '../config/config';

@Injectable()
export class PlacesProvider {
  public tab1;

  constructor(public http: Http, public config: ConfigProvider) {
    
  }

  getPlaces(d) {

    var data: { [k: string]: any } = {};

    data.customers_id = null;
    data.page_number = d.page;
    if (d.type != undefined)
      data.type = d.type;
    data.language_id = this.config.langId;

    return new Promise(resolve => {

      this.http.get(this.config.url + 'getAllPlaces/?customers_id=null&page_number='+d.page+'&type='+d.type+'&language_id='+data.language_id+'', data).map(res => res.json()).subscribe(data => {

        resolve(data.place_data);

      });
    });
  };
}
