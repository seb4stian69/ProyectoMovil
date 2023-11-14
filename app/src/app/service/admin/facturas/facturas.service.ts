import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  constructor(private http: HttpClient) {/*Void constructor*/}

  get():Observable<any>{
    return this.http.get<any>( 'http://127.0.0.1:3000/facturas');
  }

}
