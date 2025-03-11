// tab2.page.ts
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Task } from 'src/app/interfaces';
import { ModalController } from '@ionic/angular';
import { TaskDetailModalComponent } from '../modales/task-detail-modal/task-detail-modal.component'; // Importa el componente del modal
import { Auth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';


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
  constructor(
    private navCtrl: NavController, 
    private auth: Auth, 
    private apiService: ApiService, 
    private modalController: ModalController,
  ) {}

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

  async showTaskDetail(taskId: number) {
    const modal = await this.modalController.create({
    component: TaskDetailModalComponent,
    componentProps: {
      taskId: taskId
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
    });
  }
  async logout() {
    try {
      await this.auth.signOut();
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      this.navCtrl.navigateRoot('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
