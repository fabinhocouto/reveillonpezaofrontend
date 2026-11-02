import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApostaUsuarioDTO } from '../models/apostaUsuarioDTO.model';
import { RodadaService } from '../services/rodada.service';

@Component({
  selector: 'app-aposta',
  templateUrl: './aposta.component.html',
  styleUrls: ['./aposta.component.css']
})
export class ApostaComponent implements OnInit {
  isLoading = true;
  displayedColumns: string[] = [ 'rodada','numeros', 'acertos', 'statusAposta', 'codigoPix'];
  dataSource = new MatTableDataSource<ApostaUsuarioDTO>();
  isApostar = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rodadaService: RodadaService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad() {
    this.isApostar = true;
  }
  

  aoFecharAposta() {
    this.isApostar = false;
    this.onLoad();
    this.cdr.detectChanges(); 
  }

  apostar() {
    this.isApostar = true;
  }

  formatarStatus(status: string): string {
    switch (status) {
      case 'AGUARDANDO_PAGAMENTO':
        return 'Aguardando pagamento';
      case 'PAGO':
        return 'Pago';
      default:
        return status;
    }
  }
  
  
}
