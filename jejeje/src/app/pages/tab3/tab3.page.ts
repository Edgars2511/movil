import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User } from '../../interfaces/index';
import { NavController } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  id_usuario?: string;
  nombre_usuario?: string;
  contrasena?: string;
  correo_electronico?: string; 

  public resp: User[] = [];
  updatedUser: string = ''; 
  nombre_user: string = '';
  
  constructor(
    private auth: Auth,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    const usuario = localStorage.getItem('userUser'); 
    console.log(usuario);
    if (usuario) {
      this.updatedUser = usuario;
      this.nombre_user = usuario;
    }
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
