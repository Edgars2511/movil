// tab2.page.ts

import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Task } from 'src/app/interfaces';
import { ModalController } from '@ionic/angular'; // Agrega el import del ModalController
import { TaskPage } from '../modales/task/task.page'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public resp: Task[] = [];

  id?:     number;
  titulo?: string;
  fecha?:  Date;
  estado?: number;

  constructor(private apiService: ApiService, private modalController: ModalController) {}

  ngOnInit() {
    this.apiService.getTasks()
      .subscribe(resp => {
        console.log(resp);
        if (Array.isArray(resp)) {
          this.resp = resp; 
        } else {
          this.resp = [resp]; 
        }
      });
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: TaskPage,
      cssClass: 'menu-modal', // Nueva clase para el modal
      backdropDismiss: true,
      mode: 'ios',
      animated: true,
      componentProps: {
        customStyle: {
          height: '30vh',
          width: '100%'
        }
      }
    });
    return await modal.present();
  }
  
  enviarDatos() {
    const datos: Task = { // Utilizar la clase TopLevel para definir la estructura de datos
      id: this.id,
      titulo: this.titulo,
      estado: this.estado,
      fecha: this.fecha
    };
  
    this.apiService.postTask(datos).subscribe(resp => {
      console.log(resp);
      // Aquí puedes manejar la respuesta del servidor como desees
    });
  }
  
}
