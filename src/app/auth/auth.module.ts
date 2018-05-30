import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig } from 'angular4-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';
// Services
import { BPAuthService } from './auth.service';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from './auth-guard.service';
import { environment } from '../../environments/environment';
// Configs

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.GOOGLE_ID)
  }
]);
const ROUTES = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule.initialize(config),
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [RegisterComponent, LoginComponent, HomeComponent],
  providers: [BPAuthService, AuthGuard]
})
export class AuthModule { }
