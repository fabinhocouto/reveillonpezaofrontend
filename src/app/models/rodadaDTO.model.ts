import { ApostaUsuarioDTO } from "./apostaUsuarioDTO.model";

export interface RodadaDTO {
    id: number;
    valorPremio: number;
    valorAposta: number;
    qtdParticipantes: number;
    horasMinutosRestantes: string;
    fechadaParaAposta: boolean;
    lstApostaUsuarioDTO: Array<ApostaUsuarioDTO>;
  }