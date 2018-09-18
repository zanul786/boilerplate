
import { BPAuthService } from '../auth/bp-auth.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public currentPassword = '';
  public password = '';
  public repeatPassword = '';
  public errorMessage = '';

  constructor(private authService: BPAuthService) {
  }

  ngOnInit() {
  }

  public changePassword() {
    if (this.password !== this.repeatPassword) {
      this.errorMessage = 'New Password & Confirm Password does not match!';
    } else {
      this.errorMessage = '';
      const passwordDetails = {
        'newPassword': this.password,
        'currentPassword': this.currentPassword
      };
      this.authService.changePassword(passwordDetails)
        .subscribe(
          ({ token, user }) => {
            this.currentPassword = '';
            this.password = '';
            this.repeatPassword = '';
            Swal('Success!', 'Password Updated Successfully!', 'success');
          },
          (err) => {
            this.errorMessage = err.message;
          }
        );
    }
  }
}
