import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoginGuard } from './guards/login.guard';
import { GameComponent } from './pages/game/game.component';
import { LoginComponent } from './pages/login/login.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { PAGES } from './utils/pages.constant';

const routes: Routes = [
  {
    path: '',
    redirectTo: PAGES.login.url,
    pathMatch: 'full'
  },
  {
    path: PAGES.login.url,
    component: LoginComponent
  },
  {
    path: PAGES.game.url,
    canActivate: [LoginGuard],
    component: GameComponent
  },
  {
    path: PAGES.ranking.url,
    canActivate: [LoginGuard],
    component: RankingComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
