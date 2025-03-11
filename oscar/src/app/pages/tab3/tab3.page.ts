import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  email: string = '';
  password: string = '';
  

  constructor(private auth: Auth, private authService: AuthService, private router: Router) {}
  nextpage() {
    this.router.navigate(['/home']);
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

}
