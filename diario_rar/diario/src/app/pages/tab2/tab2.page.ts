// tab2.page.ts
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

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
