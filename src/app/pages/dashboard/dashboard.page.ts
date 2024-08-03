import { Component, AfterViewInit, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/sevices/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('temp') myCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('humidity') mySecondCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('semaforo') semaforoCanvas!: ElementRef<HTMLCanvasElement>;

  sensado: any;

  constructor(private apiService:DataService) { }
  ngAfterViewInit() {
    this.drawProgressDonut();
    this.drawProgressDonut2();
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

  drawProgressDonut() {
    const canvas = this.myCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const progress = 0.18; // Valor de progreso (0-1)
      const radius = Math.min(canvas.width, canvas.height) / 3;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const thickness = 10; // Grosor de la gráfica de dona

      // Dibujar el fondo de la gráfica de dona
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#0000';
      ctx.fill();

      // Dibujar la parte progresiva de la gráfica de dona
      const gradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
      gradient.addColorStop(0, '#1e344b');
      gradient.addColorStop(1, '#19a9c0');

      const startAngle = -0.5 * Math.PI;
      const endAngle = startAngle + 2 * Math.PI * progress;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineWidth = thickness;
      ctx.setLineDash([5, 5]); // Primer valor es la longitud del trazo, segundo valor es la longitud del espacio
      ctx.strokeStyle = gradient;
      ctx.stroke();

      ctx.setLineDash([]);

      // Opcional: Dibujar el texto de porcentaje en el centro
      const percentage = Math.round(progress * 100);
      ctx.fillStyle = 'black';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${percentage}°`, centerX, centerY);
    }
  }
  
  drawProgressDonut2() {
    const canvas = this.mySecondCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const progress = 0.96; // Valor de progreso (0-1)
      const radius = Math.min(canvas.width, canvas.height) / 3;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const thickness = 10; // Grosor de la gráfica de dona

      // Dibujar el fondo de la gráfica de dona
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#0000';
      ctx.fill();

      // Dibujar la parte progresiva de la gráfica de dona
      const gradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
      gradient.addColorStop(0, '#1e334a');
      gradient.addColorStop(1, '#696cff');

      const startAngle = -0.5 * Math.PI;
      const endAngle = startAngle + 2 * Math.PI * progress;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineWidth = thickness;
      ctx.setLineDash([5, 5]); // Primer valor es la longitud del trazo, segundo valor es la longitud del espacio
      ctx.strokeStyle = gradient;
      ctx.stroke();

      ctx.setLineDash([]);

      // Opcional: Dibujar el texto de porcentaje en el centro
      const percentage = Math.round(progress * 100);
      ctx.fillStyle = 'black';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${percentage}°`, centerX, centerY);
      
    }
  }

  drawTrafficLight() {
    const canvas = this.semaforoCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const progress = 0.5; // Valor de progreso (0-1)
      const width = 40;
      const height = 200;
      const ruleWidth = 5; // Ancho de la regla

      // Dibujar el fondo del semáforo
      ctx.fillStyle = '#eee';
      ctx.fillRect((canvas.width - width) / 2, 0, width - ruleWidth, height);

      // Dibujar la parte degradada del semáforo
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(1, 'red');
      gradient.addColorStop(0.5, 'yellow');
      gradient.addColorStop(0, 'green');

      ctx.fillStyle = gradient;

      // Calcular la altura de la barra de progreso
      const progressHeight = Math.max(height * progress, 5); // Mínimo 5px de altura

      ctx.fillRect((canvas.width - width) / 2, height - progressHeight, width - ruleWidth, progressHeight);
    }
  }
}
