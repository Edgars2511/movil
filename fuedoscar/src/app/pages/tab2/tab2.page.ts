import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { TopLevel, User } from 'src/app/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  nombre?: string;
  contrasena?: string;
  num_tel?: string;
  correo?: string;

  constructor(private apiService: ApiService) {}

  enviarDatos() {
    const datos: TopLevel = {
      nombre: this.nombre,
      contrasena: this.contrasena,
      num_tel: this.num_tel,
      correo: this.correo,
    };

    // Configura los encabezados para indicar que se está enviando JSON
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Llama al método postDatos() del servicio ApiService para enviar los datos al servidor
    this.apiService.postDatos(datos).subscribe(
      (resp) => {
        console.log(resp);
        // Aquí puedes manejar la respuesta del servidor como desees
      },
      (error) => {
        console.error('Error al enviar los datos:', error);
        // Aquí puedes manejar el error de manera más específica
      }
    );
  }
}