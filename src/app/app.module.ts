import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { MaterialModule } from "./material.module";
import { AppComponent } from "./app.component";
import { AuthUserService } from "./auth.user.service";
import { CartService } from "./cart.service";
import { SocketService } from "./chat/socket.service";
import { AuthModule } from "./auth/auth.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "./token.interceptor";

import { PaymentModule } from "./payment/payment.module";
import { PaymentService } from "./payment/payment.service";
import { ProfileModule } from "./profile/profile.module";
import { AboutUsComponent } from "./about-us/about-us.component";
import { FaqComponent } from "./faq/faq.component";
import { OfficeHoursComponent } from "./office-hours/office-hours.component";
import { AmazingTimePickerModule } from "amazing-time-picker";
import { MinutesToHourPipe } from "./pipes/MinutesToHourPipe";
import { ChatComponent } from "./chat/chat.component";
import { ChatService } from "./chat.service";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { FileUploadModule } from "ng2-file-upload";
import { ReviewComponent } from "./review/review.component";
import { ReviewService } from "./review.service";
import { AwsUploadComponent } from "./aws-upload/aws-upload.component";
import { StripeSubscriptionComponent } from "./stripe-subscription/stripe-subscription.component";
import { PaymentComponent } from "./payment/payment.component";
import { AdminUserComponent } from "./admin-user/admin-user.component";
import { AdminUserService } from "./admin-user/admin-user.service";
import { AdminUserDetailComponent } from "./admin-user/admin-user-detail/admin-user-detail.component";
import { CommonModule } from "@angular/common";
import { ProgressComponent } from "./progess/progess.component";
const ROUTES = [
  {
    path: "about-us",
    component: AboutUsComponent,
  },
  {
    path: "faq",
    component: FaqComponent,
  },
  {
    path: "chat",
    component: ChatComponent,
  },
  {
    path: "file",
    component: FileUploadComponent,
  },
  {
    path: "review",
    component: ReviewComponent,
  },
  {
    path: "admin/user",
    component: AdminUserComponent,
  },
  {
    path: "admin/user/:id",
    component: AdminUserDetailComponent,
  },
  {
    path: "upload",
    component: AwsUploadComponent,
  },
  {
    path: "payment",
    component: StripeSubscriptionComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    AdminUserDetailComponent,
    FaqComponent,
    OfficeHoursComponent,
    MinutesToHourPipe,
    ChatComponent,
    FileUploadComponent,
    ReviewComponent,
    AwsUploadComponent,
    StripeSubscriptionComponent,
    PaymentComponent,
    AdminUserComponent,
    ProgressComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    PaymentModule,
    ProfileModule,
    ReactiveFormsModule,
    AmazingTimePickerModule,
    FileUploadModule,
    RouterModule.forRoot(ROUTES),
    NgbModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthUserService,
    PaymentService,
    CartService,
    SocketService,
    ChatService,
    ReviewService,
    AdminUserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
