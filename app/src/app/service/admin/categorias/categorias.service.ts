import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) {/*Void constructor*/}

  get():Observable<any>{
    return this.http.get<any>( 'http://127.0.0.1:3000/categorias');
  }
  post(body:any):Observable<any>{
    return this.http.post<any>( 'http://127.0.0.1:3000/categorias',body);
  }
  put(id:any,body:any):Observable<any>{
    return this.http.put<any>( 'http://127.0.0.1:3000/categorias/'+id,body);
  }
  delete(id:any):Observable<any>{
    return this.http.delete<any>( 'http://127.0.0.1:3000/categorias/'+id);
  }

}
