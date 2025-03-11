import { Injectable, Pipe } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { TopLevel, User } from '../interfaces';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = 'http://127.0.0.1:80/api1/method.php'; // Reemplaza con la URL de tu API
  public apiUrl_usuarios = 'http://127.0.0.1:80/api1/usuarios.php';
  constructor(private http: HttpClient) { }

  getTopHeadlines(): Observable<TopLevel> {
    const userId = localStorage.getItem('userId');
    return this.http.get<TopLevel>(`${this.apiUrl}?id_usuario=${userId}`).pipe(
      map(resp => resp)
    );
  }

  // Nota
  postDatos(datos: any): Observable<any> {
    const userId = localStorage.getItem('userId');
    datos.id_usuario = userId;
    return this.http.post<any>(this.apiUrl, datos, { responseType: 'text' as 'json' });
  }
  eliminarDato(id_entrada: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}?id_entrada=${id_entrada}`, { responseType: 'text' as 'json' });
  }
  getNotaById(id: number): Observable<TopLevel> {
    return this.http.get<TopLevel>(`${this.apiUrl}?id_entrada=${id}`).pipe(
      map(resp => resp)
    );
  }
  updateNota(datos: any): Observable<any> {
    const userId = localStorage.getItem('userId');
    datos.id_usuario = userId;
    return this.http.patch<any>(this.apiUrl, datos, { responseType: 'text' as 'json' });
  }


  //User
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

  updateUserName(datos: any): Observable<any> {
    const userId = localStorage.getItem('userId');
    datos.id_usuario = userId;
    return this.http.patch<any>(this.apiUrl_usuarios, datos, { responseType: 'text' as 'json' });
  }
  



}
