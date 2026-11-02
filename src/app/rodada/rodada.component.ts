import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RodadaService } from '../services/rodada.service';
import { RodadaDTO } from '../models/rodadaDTO.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { ApostaRodada } from '../models/apostarodada.model';
import { AlertMessageService } from '../services/alert-message.service';
import { ApostaRodadaService } from '../services/aposta-rodada.service';

@Component({
  selector: 'app-rodada',
  templateUrl: './rodada.component.html',
  styleUrls: ['./rodada.component.css']
})
export class RodadaComponent implements OnInit {
  @Output() fecharAposta = new EventEmitter<void>();
  isFormValid: boolean = false;
  apostaForm!: FormGroup;
  rodadaInicial!: RodadaDTO; // Objeto para armazenar os dados da API
  cronometro: string = '00:00:00';
  private intervalId: any;
  isUsuarioLogado: boolean = false; // Suponha que você tenha um serviço de autenticação
  numerosDisponiveis: number[] = Array.from({ length: 80 }, (_, i) => i + 1);
  numerosSelecionados: number[] = [];
  etapa: 'inicial' | 'dados' | 'numeros' | 'pix' = 'inicial';
  apostas: (number | null)[][] = [[]]; 
  quantidadeApostas = 1;
  nome = '';
  telefone = '';
  telefoneConfirmado = '';
  codigoPix: string = ''; // Pix gerado
  pixValidoAte: string = '';
  mostrarComoFunciona = false;
  copiado = false;
  idRodadaParametro!: number;

  constructor(private router: Router, private serviceAuth: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder, private service: RodadaService, 
    private snackBar: MatSnackBar, 
    private authService: AuthService,private messageService: AlertMessageService, private apostaRodadaService: ApostaRodadaService) {}

  ngOnInit(): void {
    this.isUsuarioLogado = this.authService.isAuthenticatedOutNavigate();
    this.onLoad();
  }

  selecionarNumero(apostaIndex: number, numero: number): void {
    const aposta = this.apostas[apostaIndex];
    
    // Se o número já estiver na aposta, removemos
    if (aposta.includes(numero)) {
      this.apostas[apostaIndex] = aposta.filter(n => n !== numero);
    } else if (aposta.length < 6) {
      // Se ainda não tiver 6 números, podemos adicionar o número
      this.apostas[apostaIndex].push(numero);
    } else {
      // Se já tiver 6 números, não permite adicionar mais
      this.snackBar.open('Aposta ' + (apostaIndex + 1) + ' - Você já selecionou 6 números para essa aposta!', '', { duration: 3000 });
    }
  }
  
  voltarInicio() {
    this.etapa = 'inicial';
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
    this.onLoad();
  }

  confirmarAposta(): void {
    const apostasCompletas = this.apostas.every(aposta => aposta.length === 6);
  
    if (!apostasCompletas) {
      this.messageService.showMessage('Cada aposta deve ter 6 números!', 'error');
      return;
    }

    if (this.quantidadeApostas < 1) {
      this.snackBar.open('Informe pelo menos uma aposta!', '', { duration: 3000 });
      return;
    }
  
    // Enviar os dados da aposta para o backend ou processar a aposta
    console.log('Apostas confirmadas:', this.apostas);

    const apostasRodada: ApostaRodada[] = [];

    for (let i = 0; i < this.apostas.length; i++) {
      const numeros = this.apostas[i]
                      .filter(n => n !== null)
                      .map(n => (n as number).toString().padStart(2, '0'))
                      .join(';');

      const apostaRodada: ApostaRodada = {
                         nome: this.nome,
                         telefone: this.telefone,
                         codigoPix: this.codigoPix,
                         numeros: numeros,
                         rodada: this.rodadaInicial
      };
      apostasRodada.push(apostaRodada);
    }

    this.apostaRodadaService.createApostaRodada(apostasRodada).subscribe({
      next: (codigoPix: string) => {
        console.log(codigoPix);
        this.codigoPix = codigoPix;
        const agora = new Date();
        const validade = new Date(agora.getTime() + 60 * 60 * 1000); // adiciona 1 hora
        this.pixValidoAte = validade.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.messageService.showMessage('Dados salvos com sucesso!', 'success');
      },
      error: (err) => {
        console.error("Erro ao adicionar a anotação", err);
      }
    });

    this.etapa = 'pix';
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  }
  
  iniciarCronometro() {
    if (!this.rodadaInicial || !this.rodadaInicial.horasMinutosRestantes) {
      this.cronometro = "00:00:00";
      return;
    }

    const [horas, minutos] = this.rodadaInicial.horasMinutosRestantes.split(":").map(Number);
    let totalSegundos = horas * 3600 + minutos * 60;
  
    this.intervalId = setInterval(() => {
      if (totalSegundos <= 0) {
        clearInterval(this.intervalId);
        this.cronometro = "00:00:00";
        return;
      }
  
      totalSegundos--;
      const h = Math.floor(totalSegundos / 3600);
      const m = Math.floor((totalSegundos % 3600) / 60);
      const s = totalSegundos % 60;
      
      this.cronometro = this.formatarTempo(h, m, s);
    }, 1000);
  }

  formatarTempo(horas: number, minutos: number, segundos: number): string {
    return (
      String(horas).padStart(2, '0') + ':' +
      String(minutos).padStart(2, '0') + ':' +
      String(segundos).padStart(2, '0')
    );
  }

  apostar() {
    if (this.rodadaInicial.fechadaParaAposta) {
      alert("As apostas para esta rodada estão encerradas!");
      return;
    }
    this.etapa = 'dados';
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  }

  escolherNumeros() {
    this.etapa = 'numeros';
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
    this.apostas = Array.from({ length: this.quantidadeApostas }, () => []);
    console.log('Apostas para escolha de números:', this.apostas);
  }

  formatarTelefone(telefone: string): string {
    if (!telefone || telefone.length < 11) return telefone;
    const ddd = telefone.substring(0, 2);
    const primeiro = telefone.substring(2, 3);
    const oculto = '****';
    const final = telefone.substring(7);
    return `(${ddd}) ${primeiro}${oculto}${final}`;
  }

  validarNumero(i: number, j: number) {
    const valor = this.apostas[i][j];
    if (valor != null && (valor < 1 || valor > 60)) {
      this.apostas[i][j] = null;
      this.erroNumero(i, j); 
    }
  }

  atualizarApostas(): void {
    this.apostas = Array.from({ length: this.quantidadeApostas }, () => []);
    console.log('Apostas atualizadas:', this.apostas);
  }

  erroNumero(i: number, j: number): boolean {
    const valor = this.apostas[i][j];
    return valor !== null && (valor < 1 || valor > 60);
  }

  onLoad() {
    const idRodadaParametro = this.route.snapshot.paramMap.get('id');
    if(idRodadaParametro){
        this.service.getRodadaPorId(Number(idRodadaParametro)).subscribe({
            next: (response: RodadaDTO) => {
              this.rodadaInicial = response;
            },
            error: (err) => {
              console.error("Erro ao carregar rodada:", err);
            }
          });
          
    }else{
      this.service.loadRodadaAtual().subscribe({
            next: (response: RodadaDTO) => {
              this.rodadaInicial = response;
              if (!this.rodadaInicial.fechadaParaAposta) {
                this.iniciarCronometro();
              }
            },
            error: (err) => {
              console.error("Erro ao carregar rodada:", err);
            }
          });
          this.nome='';
          this.telefone='';
          this.telefoneConfirmado='';
          this.codigoPix='';
          this.quantidadeApostas=1;
          }
  }
 

  copiarPixCodigo(input: HTMLInputElement): void {
    input.select();
    input.setSelectionRange(0, 99999); // Para mobile
    navigator.clipboard.writeText(input.value).then(() => {
      this.copiado = true;
      setTimeout(() => (this.copiado = false), 2000); // Oculta após 2s
    });
  }
 

}
