import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TopLevel } from 'src/app/interfaces'; // Importar la clase TopLevel desde index.ts
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.page.html',
  styleUrls: ['./nota.page.scss'],
})
export class NotaPage  {
  id?:     number;
  titulo?: string;
  cuerpo?: string;
  fecha?: Date;

constructor(private apiService: ApiService, private auth: Auth, private router: Router) {}

ngOnInit() {
  onAuthStateChanged(this.auth, (user) => {
    if (!user) {
      // Si no hay una sesión activa, redirigir a la página de inicio de sesión
      this.router.navigate(['/login']);
    }
  });



  const userEmail = localStorage.getItem('userEmail'); // Obtener el email del almacenamiento local
  if (userEmail) {
    this.apiService.getUserByEmail(userEmail).subscribe((user: any) => {
      if (user && user.id) {
        // Establecer el ID del usuario en el servicio y en el almacenamiento local
        this.apiService.setUserId(user.id);
        localStorage.setItem('userId', user.id);
      } else {
        console.error('No se pudo obtener el ID del usuario.');
      }
    });
  }
}


enviarDatos() {
  const datos: TopLevel = { // Utilizar la clase TopLevel para definir la estructura de datos
    id: this.id,
    titulo: this.titulo,
    cuerpo: this.cuerpo,
    fecha: this.fecha
  };

  this.apiService.postDatos(datos).subscribe(resp => {
    console.log(resp);
    // Aquí puedes manejar la respuesta del servidor como desees
  });
}
}
