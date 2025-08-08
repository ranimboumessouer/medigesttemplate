import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}

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
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  /**
   * Récupérer un utilisateur par ID
   */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  /**
   * Créer un nouvel utilisateur
   */
  createUser(userData: CreateUserRequest): Observable<User> {
    return this.http.post<User>(this.apiUrl, userData, this.httpOptions);
  }

}
