import { RodadaDTO } from "./rodadaDTO.model";
import { Usuario } from "./usuario.model";

export interface ApostaRodada {
    nome: string;
    telefone: string;
    codigoPix: string;
    numeros: string;
    rodada: RodadaDTO;
  }
