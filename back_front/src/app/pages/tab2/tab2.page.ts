import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { productos } from 'src/app/interfaces'; // Importar la clase productos desde index.ts
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  id_producto?: number;
  nombre_producto?: string;
  descripcion_producto?: string;
  precio_producto?: number;
  imagen_producto?: string;
  nombre_categoria?: number;

  constructor(private apiService: ApiService, private router: Router) {}

  enviarDatos() {
    const datos: productos = {
      id_producto: this.id_producto, 
      nombre_producto: this.nombre_producto,
      descripcion_producto: this.descripcion_producto,
      precio_producto: this.precio_producto,
      imagen_producto: this.imagen_producto,
      nombre_categoria: this.nombre_categoria
    };

    this.apiService.postDatos(datos).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['/tabs']);

    });
  }
}
