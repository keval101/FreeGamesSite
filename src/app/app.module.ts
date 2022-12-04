import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';

//primeng
import {CarouselModule} from 'primeng/carousel';
import {CheckboxModule} from 'primeng/checkbox';

//ngx-bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { GameDetailComponent } from './components/game-detail/game-detail.component';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingScreenComponent,
    NavbarComponent,
    HomeComponent,
    FilterPanelComponent,
    GameDetailComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    CheckboxModule,
    SlickCarouselModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
