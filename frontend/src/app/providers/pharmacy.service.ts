import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pharmacy } from '../model/pharmacy';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PharmacyService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/pharmacies';
  }

  public findAll(): Observable<Pharmacy[]> {
    return this.http.get<Pharmacy[]>(this.url);
  }

  public save(nearestPharmacy: Pharmacy) {
    return this.http.post<Pharmacy>(this.url, nearestPharmacy).subscribe()

  }

}
