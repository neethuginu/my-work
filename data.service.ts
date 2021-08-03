import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TeamService {
  url="http://localhost:3000/teams";

  
  constructor(private http: HttpClient) { }
  createUser(data: any) {
    return this.http.post("http://localhost:3000/teams", data )

  }
  get(team :any) {
    return this.http.get("http://localhost:3000/users" + team)
  }

  deleteUser(team:any) {

   return this.http.delete("http://localhost:3000/teams/" + team)

  }
  upDateUser(team: any) {

    return this.http.put("http://localhost:3000/teams/" + team, team)

  }

  getAll() {
    return this.http.get("http://localhost:3000/teams")
  }
  // get(_id: string): Observable<any> {
  //   return this.http.get(`${this.url}/${_id}`).pipe(
  //     map((value: any) => {
  //       return value.doc.docs[0];
  //     }),
     
  // //   );
  // }

  
}
