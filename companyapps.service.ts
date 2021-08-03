
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError,  map,  mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
 export class CompanyappsService {

  constructor(private http:HttpClient) { }
 
 
  getAllData() {
    return this.http.get("http://localhost:3000/applications").pipe(
      map((value: any) => {
        if (value) {
          return value;
        }
      }),
      catchError((error) => {
        return error;
      })
    );     
     
  }

  update(id: string, data:any): Observable<any> {
    debugger;
    return this.http.put("http://localhost:3000/rows/" + id, data).pipe(
      mapTo(true),
      catchError((error) => {
        return error;
      }),
    );
  }
}

