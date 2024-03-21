import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TopLevel, Usuario, Task, Token } from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = 'http://127.0.0.1:80/api1/method.php'; // Reemplaza con la URL de tu API
  public apiUrl_usuarios = 'http://127.0.0.1:80/api1/usuarios.php';
  public apiUrl_tasks = 'http://127.0.0.1:80/api1/task.php';

  //Nuevo
  public authUrl = 'http://127.0.0.1:80/api1/auth.php'; 
  public closeUrl = 'http://127.0.0.1:80/api1/close.php'; 
  public userUrl = 'http://127.0.0.1:80/api1/user.php'; 

  constructor(private http: HttpClient) {}

  // Método para obtener los datos
  getTopHeadlines(): Observable<TopLevel> {
    return this.http.get<TopLevel>(this.apiUrl).pipe(
      map(resp => resp)
    );
  }

  get5Notas(): Observable<TopLevel> {
    return this.http.get<TopLevel>(`${this.apiUrl}?id=${1}`).pipe(
      map(resp => resp)
    );
  }


  // Método para enviar datos por POST
  postDatos(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, datos, { responseType: 'text' as 'json' });
  }

  eliminarDato(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}?id=${id}`, { responseType: 'text' as 'json' });
  }

  //Usuarios
    // Método para obtener todos los usuarios
    getUsuarios(): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(this.userUrl);
    }
  
    // Método para obtener un usuario por ID
    getUsuario(id: number): Observable<Usuario> {
      return this.http.get<Usuario>(`${this.userUrl}/${id}`);
    }
  
    // Método para agregar un nuevo usuario
    agregarUsuario(usuario: Usuario): Observable<Usuario> {
      return this.http.post<Usuario>(this.userUrl, usuario);
    }
  
    // Método para actualizar un usuario existente
    actualizarUsuario(usuario: Usuario): Observable<Usuario> {
      return this.http.put<Usuario>(`${this.userUrl}/${usuario.id_usuario}`, usuario);
    }
  
    // Método para eliminar un usuario por ID
    eliminarUsuario(id: number): Observable<any> {
      return this.http.delete<any>(`${this.userUrl}/${id}`);
    }
  
    // Método para enviar datos por POST para autenticación
    postAuth(datos: any): Observable<any> {
      return this.http.post<any>(this.authUrl, datos);
    }
  
      // Método para enviar datos por POST para cerrar sesión
    postClose(datos: any): Observable<any> {
      return this.http.post<any>(this.closeUrl, datos);
    }

  //Tasks
  getTasks(): Observable<Task> {
    return this.http.get<Task>(this.apiUrl_tasks).pipe(
      map(task => task)
    );
  }

  postTask(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrl_tasks, datos, { responseType: 'text' as 'json' });
  }

}
