import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TopLevel, User, Task } from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = 'http://127.0.0.1:80/api/method.php'; // Reemplaza con la URL de tu API
  public apiUrl_usuarios = 'http://127.0.0.1:80/api/usuarios.php';
  public apiUrl_tasks = 'http://127.0.0.1:80/api/task.php';
  private userId?: string;
  
  constructor(private http: HttpClient) {}
  
  
  setUserId(userId: string) {
    this.userId = userId; // Método para establecer el ID del usuario
  }

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

  //Tasks
  getTasks(): Observable<Task> {
    const userId = localStorage.getItem('userId');
    return this.http.get<Task>(`${this.apiUrl_tasks}?id_usuario=${userId}`).pipe(
      map(task => task)
    );
  }

  get5Task(): Observable<Task> {
    const userId = localStorage.getItem('userId');
    return this.http.get<Task>(`${this.apiUrl_tasks}?get5Tasks=${1}&id_usuario=${userId}`).pipe(
      map(resp => resp)
    );
  }

  getTaskById(id: number): Observable<TopLevel> {
    return this.http.get<TopLevel>(`${this.apiUrl_tasks}?id=${id}`).pipe(
      map(resp => resp)
    );
  }

  postTask(datos: any): Observable<any> {
    // Añadir this.userId como id_usuario en los datos
    const userId = localStorage.getItem('userId');
    datos.id_usuario = userId;
    return this.http.post<any>(this.apiUrl_tasks, datos, { responseType: 'text' as 'json' });
  }

  updateTaskById(taskId: number, updatedTitle: string): Observable<any> {
    const url = `${this.apiUrl_tasks}?id=${taskId}`; // Construir la URL para actualizar el task por su ID
    const body = { titulo: updatedTitle }; // Datos a actualizar, en este caso, solo el título

    return this.http.patch<any>(url, body, { responseType: 'json' }); // Realizar la solicitud PATCH
  }
  updateTask(datos: any): Observable<any> {
    const userId = localStorage.getItem('userId');
    datos.id_usuario = userId;
    return this.http.patch<any>(this.apiUrl_tasks, datos, { responseType: 'text' as 'json' });
  }
}
