import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginGuard } from './guards/login.guard';
import { PagesModule } from './pages/pages.module';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';

export const initializeStorageService =
  (storageService: StorageService) => (): Promise<any> =>
    storageService.init();

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    PagesModule,
    IonicStorageModule.forRoot({
      driverOrder: [
        Drivers.SecureStorage,
        Drivers.IndexedDB,
        Drivers.LocalStorage
      ]
    })
  ],
  providers: [
    LoginGuard,
    UserService,
    Vibration,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeStorageService,
      deps: [StorageService],
      multi: true
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
