import { Component, AfterViewInit, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/sevices/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('semaforo') semaforoCanvas!: ElementRef<HTMLCanvasElement>;

  sensado: any;

  constructor(private apiService:DataService) { }
  ngAfterViewInit() {
    this.drawTrafficLight();
  }
  ngOnInit(): void {
    this.apiService.getSend().subscribe(
      (data: any[]) => {
        this.sensado = data;
        
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

 

  drawTrafficLight() {
    const canvas = this.semaforoCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const progress = 0.5; // Valor de progreso (0-1)
      const width = 200; // Ancho del semáforo (ahora más ancho que alto)
      const height = 40; // Altura del semáforo
      const ruleHeight = 5; // Altura de la regla

      // Dibujar el fondo del semáforo
      ctx.fillStyle = '#eee';
      ctx.fillRect(0, (canvas.height - height) / 2, width, height - ruleHeight);

      // Dibujar la parte degradada del semáforo
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, 'red');
      gradient.addColorStop(0.5, 'yellow');
      gradient.addColorStop(1, 'green');

      ctx.fillStyle = gradient;

      // Calcular el ancho de la barra de progreso
      const progressWidth = Math.max(width * progress, 5); // Mínimo 5px de ancho

      ctx.fillRect(0, (canvas.height - height) / 2, progressWidth, height - ruleHeight);
    }
  }
}
