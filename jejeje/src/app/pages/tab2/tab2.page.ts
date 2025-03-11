import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TopLevel } from 'src/app/interfaces'; // Importar la clase TopLevel desde index.ts

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    id_entrada?: number;
    id_usuario?: number;
    titulo?:     string;
    contenido?:  string;
    creado_en?:  Date;
    

  constructor(private apiService: ApiService) {}

  enviarDatos() {
    const datos: TopLevel = {
      titulo: this.titulo,
      contenido: this.contenido,
    };

    this.apiService.postDatos(datos).subscribe(resp => {
      console.log(resp);
      // Aquí puedes manejar la respuesta del servidor como desees
    });
  }

  autoGrow(element: any) {
    if (element instanceof HTMLTextAreaElement) {
      element.style.height = 'auto'; // Establecer la altura a 'auto' para que se ajuste automáticamente
      element.style.height = (element.scrollHeight + 2) + 'px'; // Ajustar la altura al desplazamiento de la barra vertical
    }
  }
}

