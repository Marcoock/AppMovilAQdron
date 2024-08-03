import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/sevices/event.service';
declare var $: any;
declare function Active([]): any;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
// @Input() patterns = AllowPatternsDirective;
  constructor(private eventService: EventsService, private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      Active($);
    }, 50);
  }
  onSubmit(form:NgForm){

    
    const formData = {
      usuario: form.value.usuario, // Ajusta este valor según el nombre de usuario proporcionado en el formulario
      correo: form.value.correo, // Ajusta este valor según el correo electrónico proporcionado en el formulario
      contrasenia: form.value.contrasenia, // Ajusta este valor según la contraseña proporcionada en el formulario
      nombre: form.value.nombre, // Ajusta este valor según el nombre proporcionado en el formulario
      apellido_p: form.value.apellido_p, // Ajusta este valor según el apellido paterno proporcionado en el formulario
      apellido_m: form.value.apellido_m, // Ajusta este valor según el apellido materno proporcionado en el formulario
      telefono: form.value.telefono, // Ajusta este valor según el teléfono proporcionado en el formulario
      status: 'P', // Agrega el campo "status" con el valor predeterminado "P"
      calle: form.value.calle,
      numero_interno: form.value.numero_interno,
      numero_externo: form.value.numero_externo,
      colonia: form.value.colonia,
      ciudad: form.value.ciudad,
      codigo_postal: form.value.codigo_postal,      
      rol: 'Cliente' // Agrega el campo "rol" con el valor predeterminado "Cliente"
    }

    console.log(formData);

    this.eventService.create(formData).subscribe(
      (response: any) => {

        this.router.navigate(['/login']);
        // console.log(response);

        alert('Datos guardados Correctamente');
        // Navegar después de guardar los datos
      },
      (error) => {
        alert('Error al guardaar los datos');
        console.log(error);
      }
    );
  }
}
