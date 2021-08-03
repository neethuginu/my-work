import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError,  mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlickService {

  constructor(private http:HttpClient) { }
  getData(){
    debugger;
    return this.http.get("http://localhost:3000/rows")
  }

  getDatas(){
    return this.http.get("http://localhost:3000/datas")
  }

  create(data: any) {
    return this.http.post("http://localhost:3000/datas", data )

  }

  // getAllData() {
  //   return this.http.get("http://localhost:3000/response")
     
  // }
  // getAllData() {
  //   return this.http.get("http://localhost:3000/datas")
     
  // }
  getAllData() {
    return this.http.get("http://localhost:3000/applications")
     
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
