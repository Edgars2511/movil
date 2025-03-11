import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";
  
  constructor(public navCntrl: NavController, private auth: Auth, private router: Router, private newService: ApiService) {}

  ngOnInit() {
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

  async login() {
    try {
      const user = await signInWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );
      console.log(user);

      // Guardar el email en el almacenamiento local del navegador
      localStorage.setItem('userEmail', this.email);

      this.router.navigate(['/tabs']);
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
    }
  }

  gotoSignup() {
    this.navCntrl.navigateForward('signup');
  }



}
