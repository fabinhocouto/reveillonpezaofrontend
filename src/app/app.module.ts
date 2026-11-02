import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { UsuarioComponent } from './usuario/usuario.component';
import { MatTableModule } from '@angular/material/table';
import { UsuarioService } from './services/usuario.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AnotacaoComponent } from './anotacao/anotacao.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule,MAT_DATE_LOCALE } from '@angular/material/core';
import { MessageComponent } from './message/message.component';
import { LoadingInterceptor } from './loading/loading.interceptor';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from './services/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RodadaComponent } from './rodada/rodada.component';
import { ApostaComponent } from './aposta/aposta.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMaskDirective,provideNgxMask } from 'ngx-mask';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConviteComponent } from './convite/convite.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsuarioComponent,
    AnotacaoComponent,
    MessageComponent,
    LoadingComponent,
    RodadaComponent,
    ApostaComponent,
    ConviteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatIconModule,
    NgxMaskDirective,
    MatFormFieldModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    provideNgxMask({ /* opções de cfg */ }),
    AuthGuard,
    AuthService,
    UsuarioService,
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
