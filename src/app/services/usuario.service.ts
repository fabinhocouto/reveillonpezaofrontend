import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root' // O serviço é fornecido no nível raiz
})
export class UsuarioService {
  private apiUrlCriarLogin = environment.apiUrl+'/reveillonpezaopp-backend/autenticacao/criar';
  private apiUrlAtualizarUsuario = environment.apiUrl+'/reveillonpezaopp-backend/usuarios/salvar';
  private apiUrlLoadUsuario = environment.apiUrl+'/reveillonpezaopp-backend/usuarios/find-all';

  constructor(private http: HttpClient) {}

  // Método para criar um usuário
  createUser(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrlCriarLogin, user);
  }

  saveUser(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrlAtualizarUsuario, user);
  }

  loadUser(): Observable<Array<Usuario>> {
    return this.http.get<Array<Usuario>>(this.apiUrlLoadUsuario);
  }
}