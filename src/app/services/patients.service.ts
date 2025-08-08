import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private patientsUrl = 'http://localhost:8000/api/patients';

  constructor(private http: HttpClient) {}

  getAllPatient(): Observable<any> {
    return this.http.get<any>(this.patientsUrl);
  }

  /**
   * Récupérer un patient par ID
   */
  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  /**
   * Créer un nouveau patient
   */
  createPatient(patientData: CreatePatientRequest): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, patientData, this.httpOptions);
  }

  /**
   * Mettre à jour un patient
   
  updatePatient(id: number, patientData: Partial<CreatePatientRequest>): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/${id}`, patientData, this.httpOptions);
  }*/

  /**
   * Supprimer un patient
   */
  deletePatient(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
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
