import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { TopLevel } from '../../../interfaces/index';

import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-detail-modal',
  templateUrl: './task-detail-modal.component.html',
  styleUrls: ['./task-detail-modal.component.scss'],
})
export class TaskDetailModalComponent  implements OnInit {
  @Input() NotaId: number;

  id_entrada?: number;
  id_usuario?: number;
  titulo?:     string;
  contenido?:  string;
  creado_en?:  Date;
  public resp: TopLevel[] = [];

  updatedTitle: string = ''; 
  updatedCuerpo: string = ''; 

  constructor(
    private newService: ApiService, 
    private route: ActivatedRoute, 
    private navCtrl: NavController, 
    private auth: Auth, 
    private router: Router
    ) { this.NotaId = 0; }

  ngOnInit() {


    this.route.params.subscribe((params) => {
      this.id_entrada = params['id']; // Asignar el id al atributo id de la clase
      console.log('ID recibido:', this.NotaId); // Imprimir el id recibido
      if (this.NotaId !== undefined) { // Verificar si el id está definido
        this.newService.getNotaById(this.NotaId).subscribe((resp) => {
          console.log(resp);
          if (Array.isArray(resp)) {
            this.resp = resp;
          } else {
            this.resp = [resp];
          }
          this.updatedTitle = this.resp[0].titulo || ''; // Si this.resp[0].titulo es undefined, asigna una cadena vacía
        this.updatedCuerpo = this.resp[0].contenido || ''; 
        });
      } else {
        console.log('ID no definido');
      }
    });

    onAuthStateChanged(this.auth, (user) => {
      if (!user) {
        // Si no hay una sesión activa, redirigir a la página de inicio de sesión
        this.router.navigate(['/login']);
      }
    });
    
  }
  async updateTaskTitle() {
    const datos: TopLevel = {
      id_entrada: this.NotaId,
      titulo: this.updatedTitle,
      contenido: this.updatedCuerpo
    };
    if (this.updatedTitle.trim() !== '') { 
      this.newService.updateNota(datos).subscribe(resp => {
        console.log(resp);
      });
    } else {
      console.error('El título está vacío.');
    }
  }

}
