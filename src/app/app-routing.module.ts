import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    redirectTo: ''
  },
  {
    path: 'category',
    component: FilterPanelComponent
  },
  {
    path: 'game/:id',
    component: GameDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
