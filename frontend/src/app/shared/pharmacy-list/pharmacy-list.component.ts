import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {gatekeeperConfig} from "../../gatekeeper.config"
import {HttpClient, HttpResponse, HttpErrorResponse} from "@angular/common/http"
import {Observable} from "rxjs"
import {map} from 'rxjs/operators';
import 'rxjs/Rx';
import { PharmacyService } from '../../providers/pharmacy.service';
import { Pharmacy } from '../../model/pharmacy';

@Component({
  selector: 'app-pharmacy-list',
  templateUrl: './pharmacy-list.component.html',
  styleUrls: ['./pharmacy-list.component.css']
})
export class PharmacyListComponent implements OnInit {

pharmacies: Pharmacy[];
accessToken: any;
@Output() onHide = new EventEmitter<boolean>();

constructor(private http: HttpClient, private pharmacyService: PharmacyService) {}

  hideHistory() {
       this.onHide.emit(false);
  }
  ngOnInit() {
    this.pharmacyService.findAll().subscribe(data => {
      this.pharmacies = data;
    });
  }
}
