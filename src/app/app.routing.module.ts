import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AnotacaoComponent } from './anotacao/anotacao.component';
import { RodadaComponent } from './rodada/rodada.component';
import { ApostaComponent } from './aposta/aposta.component';
import { ConviteComponent } from './convite/convite.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'rodada', component: RodadaComponent },
  { path: 'rodada/:id', component: RodadaComponent },
  { path: 'aposta', component: ApostaComponent },
  { path: 'convite', component: ConviteComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}