import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TopLevel } from '../../interfaces/index';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [ApiService], // Añade el ApiService como provider aquí
})
export class Tab1Page implements OnInit {
  public resp: TopLevel[] = [];

  constructor(private newService: ApiService) {}

  ngOnInit() {
    this.newService.getTopHeadlines().subscribe((resp) => {
      console.log(resp); // Imprime el objeto TopLevel o arreglo TopLevel en la consola
      if (Array.isArray(resp)) {
        this.resp = resp; // Si es un arreglo, asigna directamente
      } else {
        this.resp = [resp]; // Si es un objeto, envuélvelo en un arreglo antes de asignar
      }
    });
  }

  eliminarDato(id_rut: number) {
    this.newService.eliminarDato(id_rut).subscribe(
      () => {
        console.log('Usuario eliminado con éxito');
        // Filtrar la lista actual para quitar el elemento eliminado
        this.resp = this.resp.filter((item) => item.id_rut != id_rut);
      },
      (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  }
}
