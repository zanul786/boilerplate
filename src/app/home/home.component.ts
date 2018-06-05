import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angular4-social-login';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private user: SocialUser;
  private loggedIn: boolean;
  constructor( private router: Router, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signOut(): void {
    this.authService.signOut();
    this.userService.unsetUser();
    this.router.navigate(['/login']);
  }

}
