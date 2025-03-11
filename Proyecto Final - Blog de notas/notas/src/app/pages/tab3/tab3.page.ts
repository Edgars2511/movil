import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TopLevel } from '../../interfaces/index';
import { Task } from 'src/app/interfaces';
import { NavController } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  public resp: TopLevel[] = [];
  public tasks: Task[] = [];

  constructor(private auth: Auth, private newService: ApiService, private navCtrl: NavController) {}

  ngOnInit() {
    this.newService.get5Notas().subscribe(resp => {
      console.log(resp);
      if (Array.isArray(resp)) {
        this.resp = resp;
      } else {
        this.resp = [resp];
      }
    });

    // Llamada al método para obtener las tareas
    this.newService.get5Task().subscribe(tasks => {
      console.log(tasks);
      if (Array.isArray(tasks)) {
        this.tasks = tasks;
      } else {
        this.tasks = [tasks];
      }
    });

    const userEmail = localStorage.getItem('userEmail'); // Obtener el email del almacenamiento local
    if (userEmail) {
      this.newService.getUserByEmail(userEmail).subscribe((user: any) => {
        if (user && user.id) {
          // Establecer el ID del usuario en el servicio y en el almacenamiento local
          this.newService.setUserId(user.id);
          localStorage.setItem('userId', user.id);
        } else {
          console.error('No se pudo obtener el ID del usuario.');
        }
      });
    }
  }

  verNota(id: number) {
    // Navegar a la página verNota y pasar el ID como parámetro
    this.navCtrl.navigateForward(`/ver-nota/${id}`);
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
