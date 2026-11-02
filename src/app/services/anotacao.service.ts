import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Anotacao } from '../models/anotacao.model';
import { environment } from 'src/environments/environment';
 


@Injectable({
  providedIn: 'root' // O serviço é fornecido no nível raiz
})
export class AnotacaoService {
  private apiUrlCriarAtualizarAnotacao = environment.apiUrl+'/reveillonpezaopp-backend/anotacoes/salvar';
  private apiUrlLoadAnotacao = environment.apiUrl+'/reveillonpezaopp-backend/anotacoes/find-all';
  private apiUrldeleteAnotacao = environment.apiUrl+'/reveillonpezaopp-backend/anotacoes';

  constructor(private http: HttpClient) {}

  // Método para criar um usuário
  createUpdateAnotacao(user: Anotacao): Observable<Anotacao> {
    return this.http.post<Anotacao>(this.apiUrlCriarAtualizarAnotacao, user);
  }

  deleteAnotacao(id: number): Observable<any> {
    const url = `${this.apiUrldeleteAnotacao}/${id}`;
    return this.http.delete(url);
  }

  loadAnotacao(): Observable<Array<Anotacao>> {
    return this.http.get<Array<Anotacao>>(this.apiUrlLoadAnotacao);
  }
}