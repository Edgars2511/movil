import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Task } from '../../../interfaces/index';

import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-task-detail-modal',
  templateUrl: './task-detail-modal.component.html',
  styleUrls: ['./task-detail-modal.component.scss'],
})
export class TaskDetailModalComponent implements OnInit {
  @Input() taskId: number;

  id?: number;
  titulo?: string;
  fecha?: Date;
  estado?: number;
  id_usuario?: number;

  public resp: Task[] = [];
  updatedTitle: string = ''; 

  constructor(
    private newService: ApiService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private auth: Auth,
    private router: Router,
    private modalController: ModalController
  ) { this.taskId = 0; }

  ngOnInit() {
    // Obtener el ID de la nota de los parámetros de la ruta
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log('ID recibido:', this.taskId);
      if (this.taskId !== undefined) {
        this.newService.getTaskById(this.taskId).subscribe((resp) => {
          console.log(resp);
          if (Array.isArray(resp)) {
            this.resp = resp;
          } else {
            this.resp = [resp];
          }
          // Inicializa updatedTitle con el valor del primer título en resp
          this.updatedTitle = this.resp[0].titulo || ''; // Si this.resp[0].titulo es undefined, establece updatedTitle en una cadena vacía
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

  async closeModal() {
    await this.modalController.dismiss();
  }
  
  async updateTaskTitle() {
    const datos: Task = {
      id: this.taskId,
      titulo: this.updatedTitle
    };
    if (this.updatedTitle.trim() !== '') { 
      this.newService.updateTask(datos).subscribe(resp => {
        console.log(resp);
      });
    } else {
      console.error('El título está vacío.');
    }
  }
  

}
