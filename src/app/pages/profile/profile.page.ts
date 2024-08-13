import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/sevices/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userId: any;
  user:any;

  constructor(private router: Router, private dataService: DataService){
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');

    this.dataService.getUs(this.userId).subscribe(
      (data: any) => {
        // console.log(data);
        this.user=data;
      },
      error => {
        console.error('Error al obtener usuario por ID:', error);
      }
    );

  }
}
