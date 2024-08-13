import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/sevices/data.service';

declare var $: any;
declare function Active([]): any;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  constructor(
    private http: HttpClient,
    private autenticacion: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      Active($);
    }, 50);
    
  }

  onSubmit(form: NgForm) {
    console.log("MARCO");
    
    const formData = form.value;
    const correo = formData.correo;
    const password = formData.contrasenia;

    if (!correo || !password) {
      alert('Ups, parece que tienes datos sin llenar. Verifica los campos.');
      return;
    }

    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailPattern.test(correo)) {
      alert("El correo electrónico no cumple con el formato adecuado");
      return;
    }

    this.autenticacion.create(formData).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.autenticacion.setUserId(response.userId);
        this.router.navigate(['/dashboard']);
        alert('Bienvenido. Acceso correcto');
      },
      (error) => {
        alert('Credenciales no validas');
        console.log(error);
      }
    );
  }
}
