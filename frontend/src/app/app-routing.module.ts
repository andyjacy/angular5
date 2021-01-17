import {NgModule}              from '@angular/core';
import {RouterModule, Routes}  from '@angular/router';

import {AppComponent} from './app.component';
import {AuthComponent} from "./shared/auth/auth.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {PharmacyListComponent} from './shared/pharmacy-list/pharmacy-list.component';

const appRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'pharmacies',
    component: PharmacyListComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
