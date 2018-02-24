import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: {
    name: {
      first?: string;
      last?: string;
    },
    email?: string;
    password?: string;
  } = { name: {} };

  constructor(private authService: AuthService) { }

  submit = (form) => {
    this.user = form.value;
    this.authService
      .register(this.user)
      .subscribe(user => {
        console.log(user);
        this.user = user;
      });
  }
}
