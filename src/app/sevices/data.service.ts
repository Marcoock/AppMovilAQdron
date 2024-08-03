import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

export interface Usuario {
  id_usuario: string;
  correo: string;
  contrasenia: string;
}
export interface token {
  token:string;
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userId: string | null = null; // Variable global para almacenar el ID del usuario
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  create(u: Usuario) {
    return this.http.post(this.apiUrl + 'login', u);
  }

  exit(t: token) {
    return this.http.post(this.apiUrl + 'logout', t);
  }

    // Método para obtener el token del localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para establecer el ID del usuario en localStorage
  setUserId(userId: string): void {
    localStorage.setItem('userId', userId);
  }
  
  // // Método para obtener el ID del usuario almacenado en localStorage
  // getUserId(): string | null {
  //   return localStorage.getItem('userId');
  // }

  getRol(id:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}rol/${id}`);
  }
  
  getUs(id:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}persona/${id}`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'usuarios');
  }
  getSend(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'ultimoRegistro');
  }
  updateUserById(id: string, userData: any): Observable<any> {
    const url = `${this.apiUrl}cliente/${id}`; // URL para actualizar el usuario por su ID
    return this.http.put<any>(url, userData);
  }

  destroyUserById(id: string): Observable<any> {
    const url = `${this.apiUrl}destroycliente/${id}`; // URL para el borrado lógico del cliente
    return this.http.put<any>(url, {});
  }
  
  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // Devuelve true si el token está presente
  }

  getData(): Observable<any> {
    const token = localStorage.getItem('token'); // Obtener el token guardado
    // Agregar el token a la cabecera de la solicitud
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

  

    return this.http.get<any>(`${this.apiUrl}admin`, { headers });
  }
}
