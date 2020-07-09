import { Component, OnInit } from '@angular/core';
import { BPAuthService } from '../bp-auth.service';
import { AuthUserService } from '../../auth.user.service';
import { AuthService } from 'angular4-social-login';
import { FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angular4-social-login';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(public snackBar: MatSnackBar,
    private authService: BPAuthService,
    private socialAuthService: AuthService,
    private userService: AuthUserService,
    private route: ActivatedRoute,
    private router: Router) { }
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        const fullName = userData.name.split(' ');
        const [first, last] = fullName;
        this.user['email'] = userData.email;
        this.user['name']['first'] = first;
        this.user['name']['last'] = last;
        this.user['oauth'] = socialPlatform.toUpperCase();
        this.authService
          .register(this.user)
          .subscribe(
            ({ user, token }) => {
              this.success();
              return this.userService.setUser({ user, token });
            },
            (err) => {
              this.handleError(err);
            }
          );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submit = (form) => {
    this.user = form.value;
    this.authService
      .register(this.user)
      .subscribe(({ user, token }) => {
        this.success();
        return this.userService.setUser({ user, token });
      },
        (err) => {
          this.handleError(err);
        });
  }

  success = () => {
    this.snackBar.open('Registered Successfully', '', {
      duration: 2000,
    }),
      this.router.navigate(['/home']);
  }

  handleError = (err) => {
    this.snackBar.open(err.message, '', {
      duration: 6000,
    });
  }
}
