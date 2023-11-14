import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Request } from './interface/request';
import { Response } from './interface/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {/*Void constructor*/}

  login(body:Request):Observable<Response[][]>{
    return this.http.post<Response[][]>( 'http://127.0.0.1:3000/login', body);
  }

}
