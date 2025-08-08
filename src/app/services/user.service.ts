import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 /**
export interface User {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  tlf: string;
  adresse: string;
  roles: string[];
  password?: string;
  nomComplet?: string;
  patient?: any[];
  medecin?: any;
  secretaire?: any;
}

export interface CreateUserRequest {
  nom: string;
  prenom: string;
  email: string;
  tlf: string;
  adresse: string;
  roles: string[];
  password: string;
}*/

@Injectable({
  providedIn: 'root'
})
export class UserService {

 private apiUrl = 'http://localhost:8000/api/users';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  /**
   * Récupérer tous les utilisateurs
   */
  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  /**
   * Récupérer un utilisateur par ID
   */
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Créer un nouvel utilisateur
   */
  createUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData, this.httpOptions);
  }

  /**
   * Mettre à jour un utilisateur
   */
  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, userData, this.httpOptions);
  }

  /**
   * Supprimer un utilisateur
   */
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  }
