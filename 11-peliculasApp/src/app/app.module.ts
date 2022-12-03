import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { BuscarComponent } from './components/buscar/buscar.component';
//ROUTES
import { app_routing } from './app.routes';

import {HttpClientModule} from '@angular/common/http'
import {HttpClient} from '@angular/common/http'
import { HttpClientJsonpModule } from '@angular/common/http'



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PeliculaComponent,
    BuscarComponent
  ],
  imports: [
    BrowserModule,
    app_routing,
    HttpClient,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
