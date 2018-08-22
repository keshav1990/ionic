// Project Name: MultiPlacesApp
// Project URI: http://neowebsolution.com
// Author: NeoWebSolution Team
// Author URI: http://neowebsolution.com/

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http';
import { ConfigProvider } from '../config/config';

export function createTranslateLoader(http: Http, config: ConfigProvider) {
  
  return new TranslateHttpLoader(http, 'http://fernzugriff.ch/appLabels3?lang=',"");
 
}