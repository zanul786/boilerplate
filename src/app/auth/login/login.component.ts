import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
  }

  submit = (form) => {
    this.authService.login(form.value)
      .subscribe(({ token, user }) => {
        return this.userService.setUser({ user, token })
      })
  }

}
