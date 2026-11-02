import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Anotacao } from '../models/anotacao.model';
import { AnotacaoService } from '../services/anotacao.service';
import { AppComponent } from '../app.component';
import { AlertMessageService } from '../services/alert-message.service';

@Component({
  selector: 'app-anotacao',
  templateUrl: './anotacao.component.html',
  styleUrls: ['./anotacao.component.css']
})
export class AnotacaoComponent implements OnInit {
  successMessage: string = '';
  anotacaoForm!: FormGroup;
  anotacoes: Anotacao[] = [];
  editando: boolean = false;
  idEditando: number | null = null;
  isFormValid: boolean = false;

  displayedColumns: string[] = ['data', 'descricao', 'acoes'];
  dataSource = new MatTableDataSource<Anotacao>(this.anotacoes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private service: AnotacaoService,private messageService: AlertMessageService) {}

  ngOnInit(): void {
    this.anotacaoForm = this.fb.group({
      id:[],
      data: [null, Validators.required],
      descricao: ['', [Validators.required, Validators.maxLength(1000)]]
    });

    this.anotacaoForm.valueChanges.subscribe(() => {
      this.isFormValid = this.anotacaoForm.valid;
    });

    this.onLoad();
  }

  ngAfterViewInit() {
    // Após a inicialização da visualização, vinculamos o paginator
    this.dataSource.paginator = this.paginator;
  }

  adicionarOuEditar() {
    if (this.anotacaoForm.invalid) return;

    const { data, descricao } = this.anotacaoForm.value;

    if (this.editando && this.idEditando !== null) {
      const index = this.anotacoes.findIndex(a => a.id === this.idEditando);
      if (index !== -1) {
        const userData = this.anotacaoForm.value;
        this.service.createUpdateAnotacao(userData).subscribe({
          next: (response) => {
            // Adicionando a anotação na lista e atualizando a tabela
            this.anotacoes[index] = response;
            // Atualizando o MatTableDataSource com a nova lista
            this.dataSource.data = [...this.anotacoes]; // Garantir a atualização da tabela
            this.paginator.pageIndex = 0; // Resetando a páginação após adicionar
            this.messageService.showMessage('Dados salvos com sucesso!', 'success');
          },
          error: (err) => {
            console.error("Erro ao adicionar a anotação", err);
          }
        });
        this.anotacoes[index] = { id: this.idEditando, data, descricao };
      }
      this.editando = false;
      this.idEditando = null;
    } else {
      const userData = this.anotacaoForm.value;
      this.service.createUpdateAnotacao(userData).subscribe({
        next: (response) => {
          // Adicionando a anotação na lista e atualizando a tabela
          this.anotacoes.push(response);
          // Atualizando o MatTableDataSource com a nova lista
          this.dataSource.data = [...this.anotacoes]; // Garantir a atualização da tabela
          this.paginator.pageIndex = 0; // Resetando a páginação após adicionar
          this.messageService.showMessage('Dados salvos com sucesso!', 'success');
        },
        error: (err) => {
          this.messageService.showMessage('Erro ao tentar adicionar anotação.', 'error');
          console.error("Erro ao adicionar a anotação", err);
        }
      });
    }

    // Resetando o formulário
    this.anotacaoForm.reset();
    this.anotacaoForm.updateValueAndValidity();
    this.isFormValid = false;
  }

  editar(anotacao: Anotacao) {
    // Preenchendo o formulário com os dados da anotação que será editada
    this.anotacaoForm.setValue({id: anotacao.id, data: anotacao.data, descricao: anotacao.descricao });
    this.idEditando = anotacao.id;
    this.editando = true;
  }

  cancelar(): void {
    // Resetando o estado de edição
    this.editando = false;
    this.idEditando = null;
    this.anotacaoForm.reset();
  }

  excluir(anotacao: Anotacao) {
    // Removendo a anotação da lista
    this.service.deleteAnotacao(anotacao.id).subscribe(
      response => {
        // Adicionando a anotação na lista e atualizando a tabela
        this.anotacoes = this.anotacoes.filter(a => a.id !== anotacao.id);
        // Atualizando o MatTableDataSource com a nova lista
        this.dataSource.data = [...this.anotacoes]; // Garantir a atualização da tabela
        this.paginator.pageIndex = 0; // Resetando a páginação após adicionar
        this.messageService.showMessage('Dados excluídos com sucesso!', 'success');
      },
      error => {
        this.messageService.showMessage('Erro ao tentar excluir.', 'error');
        console.error('Erro ao deletar item:', error);
      }
    );
    
  }

  onLoad(){
    this.service.loadAnotacao().subscribe({
      next: (response) => {
        this.anotacoes = response;
        this.dataSource.data = [...this.anotacoes]; // Garantir a atualização da tabela
        this.paginator.pageIndex = 0; // Resetando a páginação após adicionar
      },
      error: (err) => {
        
      }
    });
  }

  
}
