import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MainPage } from '../pages/main/main';
import { PrinterProvider } from './../providers/printer/printer';
import { App } from './app.component';
import { HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    App,
    MainPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(App),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    MainPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BluetoothSerial,
    PrinterProvider
  ]
})
export class AppModule {}
