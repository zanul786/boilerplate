import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityComponent } from './security.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { SecurityService } from './security.service';
const ROUTES = [
  {
    path: 'security',
    component: SecurityComponent
  },
];
@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [SecurityService],
  declarations: [SecurityComponent]
})
export class SecurityModule { }
