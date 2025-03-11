import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { TopLevel } from '../../interfaces/index';
import { switchMap } from 'rxjs/operators';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ver-nota',
  templateUrl: './ver-nota.page.html',
  styleUrls: ['./ver-nota.page.scss'],
})
export class VerNotaPage implements OnInit {
  id?:     number;
  titulo: string = ''; // Inicializa las variables
  cuerpo: string = ''; // Inicializa las variables
  fecha?: Date;
  idNota?: number; // Variable para almacenar el ID de la nota
  public resp: TopLevel[] = [];

  updatedTitle: string = ''; 
  updatedCuerpo: string = ''; 
  constructor(
    private newService: ApiService, 
    private route: ActivatedRoute, 
    private auth: Auth, 
    private router: Router,
    private location: Location
    ) { }

  ngOnInit() {
    // Obtener el ID de la nota de los parámetros de la ruta
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.idNota = id;
      this.newService.getNotaById(id).subscribe(resp => {
        console.log(resp);
        if (Array.isArray(resp)) {
          this.resp = resp; 
        } else {
          this.resp = [resp]; 
        }
        // Asignar valores a this.updatedTitle y this.updatedCuerpo
        this.updatedTitle = this.resp[0].titulo || ''; // Si this.resp[0].titulo es undefined, asigna una cadena vacía
        this.updatedCuerpo = this.resp[0].cuerpo || ''; // Si this.resp[0].cuerpo es undefined, asigna una cadena vacía
      });
    });
    
    onAuthStateChanged(this.auth, (user) => {
      if (!user) {
        // Si no hay una sesión activa, redirigir a la página de inicio de sesión
        this.router.navigate(['/login']);
      }
    });
    


  }

  async updateNotas() {
    this.route.params.pipe(
      switchMap(params => {
        const id = params['id'];
        const datos: TopLevel = {
          id: id,
          titulo: this.updatedTitle,
          cuerpo: this.updatedCuerpo
        };
        if (this.updatedTitle.trim() !== '') {
          return this.newService.updateNota(datos);
        } else {
          console.error('El título está vacío.');
          // Puedes devolver un observable vacío si no deseas continuar con la actualización
          // return EMPTY;
          // O simplemente lanzar un error para detener el flujo
          throw new Error('El título está vacío.');
        }
      })
    ).subscribe(resp => {
      console.log(resp);
    });
  }

  goBack(): void {
    this.location.back();
  } 

  autoGrow(element: any) {
    if (element instanceof HTMLTextAreaElement) {
      element.style.height = 'auto'; // Establecer la altura a 'auto' para que se ajuste automáticamente
      element.style.height = (element.scrollHeight + 2) + 'px'; // Ajustar la altura al desplazamiento de la barra vertical
    }
  }
  
}
