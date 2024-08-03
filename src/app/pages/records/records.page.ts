import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/sevices/event.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.page.html',
  styleUrls: ['./records.page.scss'],
})
export class RecordsPage implements OnInit {

  registros: any[] = [];
  fechaSeleccionada: string = '';


  constructor(private route: ActivatedRoute, private registroService: EventsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>(`http://localhost:3000/registros-agrupados`)
      .subscribe(registros => {
        // Formatear la fecha en cada registro
        this.registros = registros.map(registro => {
          return {
            date: new Date(registro.date).toISOString().slice(0, 10), // Extraer YYYY-MM-DD de la cadena ISO
            cantidad_registros: registro.cantidad_registros
          };
        });
        console.log(this.registros);
      });
  }


  descargarCSV(date: string) {
    this.http.get(`http://localhost:3000/descargarCSV?date=${date}`, { responseType: 'blob' })
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'registros.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }
}
