import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../../user.service';

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

  constructor(private authService: AuthService, private userService: UserService) { }

  submit = (form) => {
    this.user = form.value;
    this.authService
      .register(this.user)
      .subscribe(({ user, token }) => {
        return this.userService.setUser({ user, token });
      });
  }
}
