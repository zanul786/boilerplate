import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig } from 'angular4-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';
// Services
import { BPAuthService } from './bp-auth.service';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from './auth-guard.service';
import { environment } from '../../environments/environment';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';

// Configs

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.GOOGLE_ID)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.FACEBOOK_ID)
  }
]);
export function provideConfig() {
  return config;
}

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
  },
  {
    path: 'reset',
    component: ResetPasswordComponent
  },
  {
    path: ':id/unsubscribe',
    component: UnsubscribeComponent
  }
];

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [RegisterComponent, LoginComponent, HomeComponent, ForgotPasswordComponent, ResetPasswordComponent, UnsubscribeComponent],
  entryComponents: [
    ForgotPasswordComponent
  ],
  providers: [BPAuthService, AuthGuard, {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }]
})
export class AuthModule { }
