import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { gatekeeperConfig } from "./gatekeeper.config";
import { LoginComponent } from './login/login.component';
import { AuthComponent } from "./shared/auth/auth.component";
import { AuthService } from "./providers/auth.service";
import { PharmacyService } from "./providers/pharmacy.service";
import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from './home/home.component';
import { BaiduMapModule } from 'angular2-baidu-map';
import { PharmacyListComponent } from './shared/pharmacy-list/pharmacy-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthComponent,
    HomeComponent,
    PharmacyListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BaiduMapModule.forRoot({ ak: 'btLhK1BnZvScddegaEtNXiT7F0UjNGLu' })
  ],
  providers: [
    AuthService,
    PharmacyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
