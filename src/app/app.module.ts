import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { SplashAnimadoPage } from '../pages/splash-animado/splash-animado';
import { CosasFeasPage } from '../pages/cosas-feas/cosas-feas';
import { CosasLindasPage } from '../pages/cosas-lindas/cosas-lindas';
import { Toast } from '@ionic-native/toast';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service/auth-service';
import { Camera } from '@ionic-native/camera';
//------------ FireBase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { ImageProvider } from '../providers/image/image';
export const firebaseConfig = {
    apiKey: "AIzaSyAe_Ni8qNd-a6qPUbgKKYKJBBZWRKaTAlM",
    authDomain: "pp-2018-8b015.firebaseapp.com",
    databaseURL: "https://pp-2018-8b015.firebaseio.com/",
    projectId: "pp-2018-8b015",
    storageBucket: "pp-2018-8b015.appspot.com",
    messagingSenderId: "691170251529"
};
//-----------
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    TabsPage,
    RegistroPage,
    SplashAnimadoPage,
    CosasFeasPage,
    CosasLindasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig,'pp-2018'),
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    RegistroPage,
    SplashAnimadoPage,
    TabsPage,
    CosasFeasPage,
    CosasLindasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    AngularFireAuth,
    Camera,
    ImageProvider,
    Toast
  ]
})
export class AppModule {}
