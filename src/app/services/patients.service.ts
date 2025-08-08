import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 /**
export interface Patient {
  id?: number;
  dateNaissance: string;
  user: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    tlf: string;
    adresse: string;
    nomComplet: string;
  };
  rendezVous?: any[];
}

export interface CreatePatientRequest {
  dateNaissance: string;
  user: number; // ID de l'utilisateur
}
*/
@Injectable({
  providedIn: 'root'
})
export class PatientsService {
   private apiUrl = 'http://localhost:8000/api/patients';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  /**
   * Récupérer tous les patients
   */
   getAllPatient(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  /**
   * Récupérer un patient par ID
   */
  getPatientById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Créer un nouveau patient
   */
  createPatient(patientData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, patientData, this.httpOptions);
  }

  /**
   * Mettre à jour un patient
   */
  updatePatient(id: number, patientData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, patientData, this.httpOptions);
  }

  /**
   * Supprimer un patient
   */
  deletePatient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
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
