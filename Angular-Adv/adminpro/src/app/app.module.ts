import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
//Rutas
import { APP_ROUTES } from './app.routes';
//Modulos
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';

//Temporal
import { FormsModule } from '@angular/forms';

//Servicios
import { SettingsService } from './services/service.index';
import { ServiceModule } from './services/service.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ServiceModule
  ],
  providers: [
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
