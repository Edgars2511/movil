import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
//import { TopLevel } from '../../interfaces';
import { TopLevel } from '../../interfaces/index';
import { NavController } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';
import { TaskDetailModalComponent } from '../modales/task-detail-modal/task-detail-modal.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
public resp: TopLevel []=[];

  constructor(
    private newService: ApiService,  
    private navCtrl: NavController, 
    private auth: Auth,
    private modalController: ModalController,
  ) {}
  ngOnInit() {
    this.newService.getTopHeadlines()
      .subscribe(resp => {
        console.log(resp); // Imprime el objeto TopLevel o arreglo TopLevel en la consola
        if (Array.isArray(resp)) {
          this.resp = resp; // Si es un arreglo, asigna directamente
        } else {
          this.resp = [resp]; // Si es un objeto, envuélvelo en un arreglo antes de asignar
        }
      });

      const userEmail = localStorage.getItem('userEmail'); // Obtener el email del almacenamiento local
      
      if (userEmail) {
      this.newService.getUserByEmail(userEmail).subscribe((user: any) => {
        
        if (user && user.id_usuario) {
          localStorage.setItem('userId', user.id_usuario);
          localStorage.setItem('userUser', user.nombre_usuario);
        } else {
          console.error('No se pudo obtener el ID del usuario.');
        }
      });
      }
  }

  async showTaskDetail(NotaId: number) {
    console.log(NotaId);
    const modal = await this.modalController.create({
    component: TaskDetailModalComponent,
    componentProps: {
      NotaId: NotaId
    }
  });
  return await modal.present();
  }

    
  eliminarDato(id_entrada: number) {
    this.newService.eliminarDato(id_entrada).subscribe(
      () => {
        console.log("Producto eliminado con éxito");
        // Filtrar la lista actual para quitar el elemento eliminado
        this.resp = this.resp.filter(item => item.id_entrada !== id_entrada);
      },
      error => {
        console.error("Error al eliminar el producto:", error);
    }
);
  }

  verNota(id: number) {
    // Navegar a la página verNota y pasar el ID como parámetro
    this.navCtrl.navigateForward(`/info-nota/${id}`);
  }

  async logout() {
    try {
      await this.auth.signOut();
      localStorage.removeItem('userId');
      // Elimina cualquier información de sesión almacenada en el navegador
      localStorage.removeItem('userEmail');
      // Redirige al usuario a la página de inicio de sesión o a la página de bienvenida
      this.navCtrl.navigateRoot('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }


}
