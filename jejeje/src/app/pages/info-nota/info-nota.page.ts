import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { TopLevel } from '../../interfaces/index';

import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-nota',
  templateUrl: './info-nota.page.html',
  styleUrls: ['./info-nota.page.scss'],
})
export class InfoNotaPage implements OnInit {
  id_entrada?: number;
  id_usuario?: number;
  titulo?:     string;
  contenido?:  string;
  creado_en?:  Date;
  public resp: TopLevel[] = [];

  constructor(private newService: ApiService, private route: ActivatedRoute, private navCtrl: NavController, private auth: Auth, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.newService.getNotaById(id)
        .subscribe(resp => {
        console.log(resp);
        if (Array.isArray(resp)) {
          this.resp = resp; 
        } else {
          this.resp = [resp]; 
        }
      });
    });

    onAuthStateChanged(this.auth, (user) => {
      if (!user) {
        // Si no hay una sesión activa, redirigir a la página de inicio de sesión
        this.router.navigate(['/login']);
      }
    });
    
  }

}
