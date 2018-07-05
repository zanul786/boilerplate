import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { CartService } from './cart.service';
import { AuthModule } from './auth/auth.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

import { PaymentModule } from './payment/payment.module';
import { PaymentService } from './payment/payment.service';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MaterialModule,
    AuthModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    PaymentModule,
    ProfileModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    PaymentService,
    CartService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
