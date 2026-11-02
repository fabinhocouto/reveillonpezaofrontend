import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { ApostaRodada } from '../models/apostarodada.model';
 


@Injectable({
  providedIn: 'root' // O serviço é fornecido no nível raiz
})
export class ApostaRodadaService {
  private apiUrlSaveApostaRodada = environment.apiUrl+'/reveillonpezaopp-backend/aposta-rodadas/salvar';
  
  constructor(private http: HttpClient, private serviceAuth: AuthService) {}

  createApostaRodada(apostas: any[]): Observable<string> {
    return this.http.post(this.apiUrlSaveApostaRodada, apostas, { 
      responseType: 'text' as const 
    });
  }
}