import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TopLevel, User } from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = 'http://127.0.0.1:80/api_notas/method.php'; // Reemplaza con la URL de tu API
  public apiUrl_usuarios = 'http://127.0.0.1:80/api_notas/usuarios.php';
  
  constructor(private http: HttpClient) {}
  

  // Método para obtener los datos
  getTopHeadlines(): Observable<TopLevel> {
    const userId = localStorage.getItem('userId');
    return this.http.get<TopLevel>(`${this.apiUrl}?id_usuario=${userId}`).pipe(
      map(resp => resp)
    );
  }

  get5Notas(): Observable<TopLevel> {
    const userId = localStorage.getItem('userId');
    return this.http.get<TopLevel>(`${this.apiUrl}?get5Notas=${1}&id_usuario=${userId}`).pipe(
      map(resp => resp)
    );
  }

  getNotaById(id: number): Observable<TopLevel> {
    return this.http.get<TopLevel>(`${this.apiUrl}?id=${id}`).pipe(
      map(resp => resp)
    );
  }
  
  postDatos(datos: any): Observable<any> {
    const userId = localStorage.getItem('userId');
    datos.id_usuario = userId;
    return this.http.post<any>(this.apiUrl, datos, { responseType: 'text' as 'json' });
  }

  updateNota(datos: any): Observable<any> {
    const userId = localStorage.getItem('userId');
    datos.id_usuario = userId;
    return this.http.patch<any>(this.apiUrl, datos, { responseType: 'text' as 'json' });
  }

  eliminarDato(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}?id=${id}`, { responseType: 'text' as 'json' });
  }

  //Usuarios
  saveUserData(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json'
    };
    return this.http.post<any>(`${this.apiUrl_usuarios}`, user, {...httpOptions});
  }
  
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl_usuarios}?email=${email}`);
  }



}
