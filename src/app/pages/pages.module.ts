import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../components/components.module';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import { RankingComponent } from './ranking/ranking.component';

@NgModule({
  declarations: [LoginComponent, GameComponent, RankingComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    IonicModule.forRoot()
  ]
})
export class PagesModule {}
