// modal.service.ts

import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TaskPage } from '../pages/modales/task/task.page';  

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  constructor(private modalController: ModalController) {}

  async openCustomModal(height: string = '20vh') {
    const modal = await this.modalController.create({
      component: TaskPage,
      cssClass: 'menu-modal',
      componentProps: { height }, // Pasa la altura como propiedad al componente del modal
    });

    await modal.present();
  }
}
