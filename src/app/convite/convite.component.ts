
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-convite',
  templateUrl: './convite.component.html',
  styleUrls: ['./convite.component.css']
})
export class ConviteComponent {

  mensagemSucesso = '';

  formConvite = this.fb.group({
    nome: ['', Validators.required],
    telefone: ['', [
      Validators.required,
      Validators.pattern(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/)
    ]],
    quantidade: [1, [
      Validators.required,
      Validators.min(1),
      Validators.max(100)
    ]]
  });

  constructor(private fb: FormBuilder) {}

  gerarIngresso(): void {

    if (this.formConvite.invalid) {
      this.formConvite.markAllAsTouched();
      return;
    }

    const convite = this.formConvite.getRawValue();

    console.log('Convite gerado:', convite);

    this.mensagemSucesso =
      `${convite.quantidade} ingresso(s) gerado(s) para ${convite.nome}!`;

    this.formConvite.reset({
      nome: '',
      telefone: '',
      quantidade: 1
    });

    this.formConvite.markAsPristine();
    this.formConvite.markAsUntouched();
  }
}
