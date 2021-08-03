import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, mapTo } from 'rxjs/operators';
import { VyaRestClientService } from "vya-restclient";

@Injectable({
  providedIn: 'root'
})
export class PathService {

  roleUrl: string = `/api/website/master`;

  constructor(
    private http: HttpClient,
    private restClient: VyaRestClientService 
    ) { }

  getAllData() {
    return this.http.get(`http://localhost:3000/paths`)
    // .pipe(
    //   map((value: any) => {
    //     if (value) {
    //       return value;
    //     }
    //   }),
    //   catchError((error) => {
    //     return error;
    //   })
    // );     
  }

  create(data: any): Observable<any | boolean> {
    return this.http.post(`http://localhost:3000/paths`, data).pipe(
      mapTo(true),
      catchError((error) => {
        return error;
      })
    );
  }

  getRole(id: any, pid: any): Observable<any> {
    return this.restClient.get(`${this.roleUrl}?pid=${pid}&id=${id}`).pipe(
      map((value: any) => {
        console.log(value)
        return value.doc.docs[0];
      }),
      catchError((error) => {
        return error;
      })
    );
  }

 
}
