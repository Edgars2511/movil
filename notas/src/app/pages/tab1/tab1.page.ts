import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TopLevel } from '../../interfaces/index';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  public resp: TopLevel[] = [];

  constructor(private newService: ApiService) {}

  ngOnInit() {
    this.newService.getTopHeadlines()
      .subscribe(resp => {
        console.log(resp);
        if (Array.isArray(resp)) {
          this.resp = resp; 
        } else {
          this.resp = [resp]; 
        }
      });
  }

  eliminarDato(id: number) {
    this.newService.eliminarDato(id).subscribe(
      () => {
        console.log("Producto eliminado con éxito");
        // Filtrar la lista actual para quitar el elemento eliminado
        this.resp = this.resp.filter(item => item.id !== id);
      },
      error => {
        console.error("Error al eliminar el producto:", error);
      }
    );
  }
}