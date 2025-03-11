import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private auth: Auth, private router: Router) {
    this.checkAuthState();
  }

  async checkAuthState() {
    // Comprobar el estado de autenticación al cargar la aplicación
    onAuthStateChanged(this.auth, (user) => {
      /*
      if (user) {
        // Si hay una sesión activa, redirigir al tab3
        this.router.navigate(['/tabs/tab3']);
      } else {
        // Si no hay sesión activa, redirigir al inicio de sesión
        this.router.navigate(['/login']);
      }*/
    });
  }
}
