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
import { SocketService } from './chat/socket.service';
import { AuthModule } from './auth/auth.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

import { PaymentModule } from './payment/payment.module';
import { PaymentService } from './payment/payment.service';
import { ProfileModule } from './profile/profile.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { OfficeHoursComponent } from './office-hours/office-hours.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { MinutesToHourPipe } from './pipes/MinutesToHourPipe';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat.service';


const ROUTES = [
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    FaqComponent,
    OfficeHoursComponent,
    MinutesToHourPipe,
    ChatComponent,
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
    ReactiveFormsModule,
    AmazingTimePickerModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    UserService,
    PaymentService,
    CartService,
    SocketService,
    ChatService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
