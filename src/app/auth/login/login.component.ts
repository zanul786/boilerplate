import { Component, OnInit } from '@angular/core';
import { BPAuthService } from '../auth.service';
import { UserService } from '../../user.service';
import { AuthService } from 'angular4-social-login';
import { FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angular4-social-login';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public snackBar: MatSnackBar,
              private authService: BPAuthService,
              private socialAuthService: AuthService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined){
        this.sendResetPasswordLink(result);
      }
    });
  }

  sendResetPasswordLink(email){
     if(email){
      this.authService.sendLink(email).subscribe(
        (result) => {
          this.snackBar.open('Reset Link is sent successfully, Please check your email!', '', {
            duration: 2000,
          })
        },
        (err) => {
          this.handleError(err);
        }
      );
     }
  }
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        const newuser = { };
        newuser['email'] = userData.email;
        newuser['oauth'] = socialPlatform.toUpperCase();
        this.authService.login(newuser)
        .subscribe(
          ({ token, user }) => {
              return this.userService.setUser({ user, token }),
              this.success();
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
    this.authService.login(form.value)
      .subscribe(({ token, user }) => {
        return this.userService.setUser({ user, token }),
        this.success();
      },
      (err) => {
        this.handleError(err);
      });
  }

  success = () => {
    this.snackBar.open('Logged In', '', {
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
