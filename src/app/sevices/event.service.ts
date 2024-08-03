import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface registro {
  usuario: string;
  correo: string;
  contrasenia: string;
  apellido_p: string;
  apellido_m: string;
  telefono: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private apiUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  create(u: registro) {
    return this.http.post(this.apiUrl + 'registro', u);
  }
  descargarRegistros(date: string) {
    return this.http.get(`${this.apiUrl}/descargarCSV?date=${date}`, { responseType: 'text' });
  }
}
