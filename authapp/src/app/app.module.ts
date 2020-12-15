import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_ROUTING } from './app.routes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PreciosComponent } from './components/precios/precios.component';
import { ProtegidaComponent } from './components/protegida/protegida.component';

//Servicios
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PreciosComponent,
    ProtegidaComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    AuthModule.forRoot({
      domain: 'dev-twe106-t.us.auth0.com',
      clientId: '6VMcGSQ6N4ClX99Zv31K5ubfS0eL4hzY'
    })
  ],
  providers: [
    AuthButtonComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
