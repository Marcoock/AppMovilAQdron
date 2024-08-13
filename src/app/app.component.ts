import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from './sevices/data.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  token: any;
  userId: any;
  user:any;
  avatar: any;

  constructor(private router: Router, private dataService : DataService) {}

  ngOnInit(): void {
    // Escuchar los eventos de navegación y ejecutar la lógica solo si no estamos en la ruta /login
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.router.url !== '/login') {
        this.userId = localStorage.getItem('userId');
        
        if (this.userId) { // Asegurarse de que userId no es nulo
          this.dataService.getRol(this.userId).subscribe(
            (data: any) => {
              this.avatar = data;
              console.log(data);
            },
            error => {
              console.error('Error al obtener usuario por ID:', error);
            }
          );
        }
      }
    });
  }

  public appPages = [
    { title: 'Perfil', url: '/profile', icon: 'person' },
    { title: 'Pagina Principal', url: '/dashboard', icon: 'home' },
    { title: 'Registros', url: '/records', icon: 'grid' },
    { title: 'Casificaciones', url: '/predictions', icon: 'disc' },
  ];

  onClick() {
    this.token = localStorage.getItem('token');
    this.dataService.exit(this.token).subscribe(
      (response: any) => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        this.router.navigate(['/login']);
      },
      (error) => {
        alert('Error de sesión');
        console.log(error);
      }
    );
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
