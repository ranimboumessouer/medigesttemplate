import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private patientsUrl = 'http://localhost:8000/api/patients';

  constructor(private http: HttpClient) {}

  getAllPatient(): Observable<any> {
    return this.http.get<any>(this.patientsUrl);
  }
}





















// import { HttpClient } from '@angular/common/http';
// import { Injectable, OnInit } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class PatientsService {

//  public patientsUrl = 'http://localhost:8000/api/patients';

//   constructor(private http: HttpClient) {}

//   getAllPatient() {
//     return this.http.get(this.patientsUrl);
//   }
// }
