import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  invalidCredentials = false;
  serverOut = false;
  showRegister = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Formulário de Login
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Formulário de Cadastro
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Alternar entre Login e Cadastro
  toggleRegister() {
    this.showRegister = !this.showRegister;
  }

  // Submeter Login
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          this.authService.setToken(response.token);
          this.invalidCredentials = false;
          this.serverOut = false;
          const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
          if(redirectUrl){
            localStorage.removeItem('redirectAfterLogin'); // Remove a URL salva
            this.router.navigate([redirectUrl]); // Redireciona o usuário
          }else{
            this.router.navigate(['/home']);
          }    
        },
        error: (err) => {
          if (err.status === 403) {
            this.invalidCredentials = true;
            this.serverOut = false;
          } else {
            this.invalidCredentials = false;
            this.serverOut = true;
          }
          console.error('Erro ao fazer login:', err);
        }
      });
    }
  }

  // Submeter Cadastro
  onRegister() {
    if (this.registerForm.valid) {
      const { name, username, password } = this.registerForm.value;
      
    }
  }
}
