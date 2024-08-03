import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './sevices/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  userId: any;
  user:any;

  constructor(private router: Router, private dataService : DataService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');

    this.dataService.getRol(this.userId).subscribe(
      (data: any) => {
        if (data.rol === 'Administrador') {
          this.user = true;
        }else{
          this.user = false;
        }
      },
      error => {
        console.error('Error al obtener usuario por ID:', error);
      }
    );
  }
  public appPages = [
    { title: 'Pagina Principal', url: '/dashboard', icon: 'mail' },
    { title: 'Registros', url: '/records', icon: 'paper-plane' },
    { title: 'Casificaciones', url: '/predictions', icon: 'heart' },
    // { title: 'Maps', url: '/folder/archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  
  logout(){
    this.router.navigate(['/login']);
  }
}
