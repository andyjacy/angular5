import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import {ControlAnchor, MapOptions, MapTypeControlOptions, MapTypeControlType,NavigationControlOptions, NavigationControlType, OverviewMapControlOptions,ScaleControlOptions, MarkerOptions, GeolocationControlOptions, Point, BMapInstance} from 'angular2-baidu-map'
import {ActivatedRoute, Router} from "@angular/router"
import {gatekeeperConfig} from "../../gatekeeper.config"
import {HttpClient, HttpResponse, HttpErrorResponse} from "@angular/common/http"
import {Observable} from "rxjs/Observable"
import {map} from 'rxjs/operators';
import 'rxjs/Rx';
import { PharmacyService } from '../../providers/pharmacy.service';
import { Pharmacy } from '../../model/pharmacy';


declare var BMap: any;
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: [`
    baidu-map{
      width: 100%;
      height: 500px;
      display: block;
    }`]
})

export class AuthComponent implements OnInit {
  markers: any[] = [];
  options: MapOptions;
  local: any;
  navOptions: NavigationControlOptions;
  address = '上海市人民广场';
  pharmacy: Pharmacy;
  accessToken: any;
  code: string;
  showSearch: boolean;
  showList: boolean;
  constructor(private route: ActivatedRoute,
                private router: Router,
                private http: HttpClient,
                private pharmacyService: PharmacyService) {}

  public getToken(code) {
    this.accessToken = this.http.get(gatekeeperConfig.development.gatekeeper + '/authenticate/' + code)
      .subscribe(
        data => {
        if (typeof(data['token']) != "undefined") {
          this.accessToken = data['token'];
          localStorage.setItem("access_token", this.accessToken.token);
        } else {
          localStorage.removeItem("access_token");
          this.router.navigate(['login']);
        }
      },
        err => {this.handleError(err)}
      )

    return this.accessToken;
  }

  private handleError(error: HttpErrorResponse) {
    return Observable.throw(error.error || 'Server error');
  }

  ngOnInit() {
    this.showSearch=true;
    this.showList=false;
    this.pharmacy = new Pharmacy();
    this.route.queryParams.subscribe(
      (param: any) => {
        this.code = param['code'];
        this.getToken(this.code);
     });
    this.options = {
        currentCity: '上海市',
        minZoom: 1,
        maxZoom: 18,
        enableScrollWheelZoom: true,
        centerAndZoom: {
          lat: 31.23 ,
          lng: 121.47,
          zoom: 16
        },
        enableKeyboard: true
    };

    this.navOptions = {
      anchor: ControlAnchor.BMAP_ANCHOR_TOP_RIGHT,
      type: NavigationControlType.BMAP_NAVIGATION_CONTROL_PAN
    };
  }

  loadMap(e: any) {
    this.local = new BMap.LocalSearch(e, {
        renderOptions: {map: e, autoViewport: true, selectFirstResult: false},
        pageCapacity: 10
    });
    this.local.setSearchCompleteCallback(async (searchResults) => {

      let markeSize = this.markers.length;
      for (let i = 0; i < markeSize; i++) {
        e.removeOverlay(this.markers[i]);
      }
      this.markers = [];
      if (typeof(searchResults) == "undefined") {
        alert("百度API没有搜索到该地址");
        return;
      }
      let temp;
      let myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
        offset: new BMap.Size(10, 25),
        imageOffset: new BMap.Size(0, 0 - 10 * 25)
      });
      let contents = [];
      for (let i = 0; i < searchResults.getCurrentNumPois(); i++) {
        this.markers[i] = new BMap.Marker(new BMap.Point(searchResults.getPoi(i).point.lng, searchResults.getPoi(i).point.lat), {icon: myIcon});
        contents[i] = "你要查找的地方:【" + searchResults.getPoi(i).title + "】地址：" + searchResults.getPoi(i).address;
        this.markers[i].title = contents[i];
        this.markers[i].addEventListener("click", () => {
            var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + contents[i] + "</p>");
            this.markers[i].openInfoWindow(infoWindow);
        });
        e.addOverlay(this.markers[i]);
        if (i == 0) {
          var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + contents[0] + "</p>");
          this.markers[0].openInfoWindow(infoWindow);
          this.saveNearestPharmacy(searchResults.getPoi(i).title);
        }
      }
    });
  }

  search() {this.local.searchNearby("药店", this.address, 5000);}
  listHistory() {this.showSearch = false; this.showList = true;}
  changeHide(val: boolean) {
    this.showList = val;
    this.showSearch = true;
  }
  saveNearestPharmacy(store: string) {
    this.pharmacy.address = this.address;
    this.pharmacy.pharmacy = store;
    this.pharmacyService.save(this.pharmacy);
  }
}
