import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor() { }

  setUserData(correo: string, token: string) {
    sessionStorage.setItem('correo', correo);
    sessionStorage.setItem('token', token);
  }

  getCorreo(): string {
    return sessionStorage.getItem('correo') || '';
  }

  getToken(): string {
    return sessionStorage.getItem('token') || '';
  }

  clearUserData() {
    sessionStorage.removeItem('correo');
    sessionStorage.removeItem('token');
  }

  printUserData() {
    const correo = this.getCorreo();
    const token = this.getToken();
    console.log('Correo del usuario:', correo);
    console.log('Token del usuario:', token);
  }
}
