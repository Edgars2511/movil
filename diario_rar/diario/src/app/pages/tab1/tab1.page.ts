import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TopLevel, User } from '../../interfaces/index';
import { NavController } from '@ionic/angular';

import { Auth } from '@angular/fire/auth';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  public resp: TopLevel[] = [];
  nombre_user: string = '';

  constructor(private newService: ApiService, private navCtrl: NavController, private auth: Auth) {}

  ngOnInit() {
    const usuario = localStorage.getItem('User'); 
    if (usuario) {
      this.nombre_user = usuario;
    }

    this.newService.getTopHeadlines()
      .subscribe(resp => {
        console.log(resp);
        if (Array.isArray(resp)) {
          this.resp = resp; 
        } else {
          this.resp = [resp]; 
        }
      });
    
      const userEmail = localStorage.getItem('userEmail'); // Obtener el email del almacenamiento local
      if (userEmail) {
        this.newService.getUserByEmail(userEmail).subscribe((user: any) => {
          if (user && user.id) {
            localStorage.setItem('userId', user.id);
            localStorage.setItem('User', user.usuario);
          } else {
            console.error('No se pudo obtener el ID del usuario.');
          }
        });
      }
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
      localStorage.removeItem('User');
      // Redirige al usuario a la página de inicio de sesión o a la página de bienvenida
      this.navCtrl.navigateRoot('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}