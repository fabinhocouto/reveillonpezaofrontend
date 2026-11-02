import { RodadaDTO } from "./rodadaDTO.model";

export interface ApostaUsuarioDTO {
    nomeUsuario: string;
    numeros: string;
    acertos: number;
    statusAposta: string;
    codigoPix: string;
    rodada: RodadaDTO;
    telefone: string;
  }