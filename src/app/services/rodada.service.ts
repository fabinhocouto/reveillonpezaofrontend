import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RodadaDTO } from '../models/rodadaDTO.model';
import { ApostaUsuarioDTO } from '../models/apostaUsuarioDTO.model';
import { AuthService } from '../auth.service';
 


@Injectable({
  providedIn: 'root' // O serviço é fornecido no nível raiz
})
export class RodadaService {
  private apiUrlLoadRodadaInicial = environment.apiUrl+'/reveillonpezaopp-backend/rodadas/atual';
  private apiUrlLoadApostaPorUusuario = environment.apiUrl+'/reveillonpezaopp-backend/rodadas/aposta-por-usuario/:ID';
  private apiUrlLoadRodadaPorId = environment.apiUrl+'/reveillonpezaopp-backend/rodadas';

  constructor(private http: HttpClient, private serviceAuth: AuthService) {}

  // Método para criar um usuário
  loadRodadaAtual(): Observable<RodadaDTO> {
    return this.http.get<RodadaDTO>(this.apiUrlLoadRodadaInicial);
  }

  getRodadaPorId(id: number): Observable<RodadaDTO> {
    return this.http.get<RodadaDTO>(`${this.apiUrlLoadRodadaPorId}/${id}`);
  }

  loadApostasPorUsuario(): Observable<Array<ApostaUsuarioDTO>> {
    const id = this.serviceAuth.getUserIdFromToken();
    if (id === null) {
      throw new Error('ID do usuário não encontrado no token.');
    }
  
    const url = this.apiUrlLoadApostaPorUusuario.replace(':ID', id.toString());
    return this.http.get<Array<ApostaUsuarioDTO>>(url);
  }
}