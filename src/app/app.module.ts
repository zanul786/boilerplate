import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { UserService } from './user.service';

import { AuthModule } from './auth/auth.module';

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
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
