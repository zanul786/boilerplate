import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BPAuthService } from '../auth.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  email:string;
  reset: boolean = false;
  constructor(private fb: FormBuilder, private route: ActivatedRoute,private authService: BPAuthService) {
      this.route.queryParams.subscribe(params => {
        this.email = params['email'];
      })
      this.createForm()
  }

  ngOnInit() {}
  get cpwd() {
    return this.resetForm.get('confirmpassword');
   }
  createForm() {
    this.resetForm = this.fb.group({
      email: [this.email, Validators.required ],
      password: [null, Validators.required ],
      confirmpassword: [null, [Validators.required, this.passwordConfirming]]
    });
  }
  passwordConfirming(c: AbstractControl): any {
        if(!c.parent || !c) return;
        const pwd = c.parent.get('password');
        const cpwd= c.parent.get('confirmpassword')

        if(!pwd || !cpwd) return ;
        if (pwd.value !== cpwd.value) {
            return { invalid: true };

    }
  }

  onSubmit() {
    this.authService.resetPassword(this.resetForm.value).subscribe(
      (result) => {
          this.email = result.email;
          this.reset = true;
      },
      (err) => {
        console.log(err)
      }
    );
  }
}
