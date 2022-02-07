import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { StepsComponent } from './steps/steps.component';

@NgModule({
  declarations: [StepsComponent, HeaderComponent],
  imports: [RouterModule, CommonModule],
  exports: [StepsComponent, HeaderComponent],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }]
})
export class ComponentsModule {}
