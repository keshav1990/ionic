
if (localStorage.langId == undefined) {
  localStorage.langId = '1';
}
if (localStorage.direction == undefined) {
  localStorage.direction = 'ltr';
}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule, Http } from '@angular/http';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigProvider } from '../providers/config/config';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../providers/translate/translate';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { PlacesProvider } from '../providers/places/places';
import { EventsProvider } from '../providers/events/events';
 import { SignUpPage } from '../pages/sign-up/sign-up';
import { LoginPage } from '../pages/login/login';

import { IntroPage } from '../pages/intro/intro';
import { LoadingProvider } from '../providers/loading/loading';
import { SharedDataProvider } from '../providers/shared-data/shared-data';

import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { PlaceComponent } from '../components/place/place';
import { EventComponent } from '../components/event/event';
import { FooterComponent } from '../components/footer/footer';
//import { ComponentsModule } from '../components/components.module';
import { SlidingTabsComponent } from '../components/sliding-tabs/sliding-tabs';
import { PlaceDetailPage } from '../pages/place-detail/place-detail';
import { EventDetailPage } from '../pages/event-detail/event-detail';
import { HeaderComponent } from '../components/header/header';

import { Toast } from '@ionic-native/toast';
import { SearchPage } from '../pages/search/search';
import { EventSearchPage } from '../pages/event-search/event-search';
import { AlertProvider } from '../providers/alert/alert';
import { EventsPage } from '../pages/events/events';
import { GroupsPage } from '../pages/groups/groups';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ThankYouPage } from '../pages/thank-you/thank-you';
import { MyAccountPage } from '../pages/my-account/my-account';
import { NewsPage } from '../pages/news/news';
import { SettingsPage } from '../pages/settings/settings';
import { NewsDetailPage } from '../pages/news-detail/news-detail';
import { NewsListPage } from '../pages/news-list/news-list';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Push } from '@ionic-native/push';
import { Device } from '@ionic-native/device';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { TermServicesPage } from '../pages/term-services/term-services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Network } from '@ionic-native/network';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AdMobFree} from '@ionic-native/admob-free';
import { FCM } from '@ionic-native/fcm';
import { AppVersion } from '@ionic-native/app-version';
import { OneSignal } from '@ionic-native/onesignal';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchPage,
    EventSearchPage,
    IntroPage,
    
   // PlacesPage,
  
    //ContactUsPage,
  
   // AboutUsPage,
  
    LoginPage,
    SignUpPage,
    ForgotPasswordPage,
    HeaderComponent,
   
   
    
    MyAccountPage,
    PlaceComponent,
    EventComponent,
    FooterComponent,
    SlidingTabsComponent,
    PlaceDetailPage,
    EventDetailPage,
	ThankYouPage,
    PrivacyPolicyPage,
    TermServicesPage,
    NewsPage,
	EventsPage,
	GroupsPage,
    NewsDetailPage,
    NewsListPage,
    SettingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      iconMode: 'md',
    }),
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    LazyLoadImageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
     MyApp,
    HomePage,
    SearchPage, 
     EventSearchPage,
    IntroPage,
    
    //PlacesPage,
  
   // ContactUsPage,
   
   // AboutUsPage,
  
    LoginPage,
    SignUpPage,
    ForgotPasswordPage,
    HeaderComponent,
   
    MyAccountPage,
    PlaceComponent,
    EventComponent,
   
    FooterComponent,
    SlidingTabsComponent,
    PlaceDetailPage,
    EventDetailPage,
ThankYouPage,
    PrivacyPolicyPage,

    TermServicesPage,
    NewsPage,
    NewsDetailPage,
    NewsListPage,    
	EventsPage,
	GroupsPage,
    HomePage,
   
    SettingsPage
  ],
  providers: [
    ConfigProvider,
    StatusBar, 
    SplashScreen, 
    SocialSharing,
    Toast,
    ConfigProvider,
    PlacesProvider,
    EventsProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PlacesProvider,
    LoadingProvider,
    SharedDataProvider,
    Camera,
   // Stripe,
    AlertProvider,
   
    
    Push,
    Device, 
    Facebook,
    GooglePlus,
    LocalNotifications,
    InAppBrowser,
    Network,
    AdMobFree,
    FCM,
    AppVersion,
    OneSignal
  ]
})
export class AppModule {}

