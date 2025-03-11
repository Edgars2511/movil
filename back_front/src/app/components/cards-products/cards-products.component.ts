import { Component, OnInit } from '@angular/core';
import { productos } from '../../interfaces/index';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-cards-products',
  templateUrl: './cards-products.component.html',
  styleUrls: ['./cards-products.component.scss'],
})
export class CardsProductsComponent  implements OnInit {
  public resp: productos[] = [];

  constructor( private newService: ApiService) { }

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

  eliminarDato(id_producto: number) {
    this.newService.eliminarDato(id_producto).subscribe(
      (response: any) => {
        console.log(response);
        this.resp = this.resp.filter(item => item.id_producto !== id_producto);
      },
      error => {
        console.error("Error al eliminar el registro:", error);
      }
    );
  }

}
