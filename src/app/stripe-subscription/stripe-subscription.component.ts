import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import swal from "sweetalert2/dist/sweetalert2.js";
import { Router } from "@angular/router";
import { AuthUserService } from '../auth.user.service';
import { UserService } from '../auth/user-service.service';
import { BPAuthService } from '../auth/bp-auth.service';


@Component({
  selector: 'app-stripe-subscription',
  templateUrl: './stripe-subscription.component.html',
  styleUrls: ['./stripe-subscription.component.css']
})
export class StripeSubscriptionComponent implements OnInit {

  userCardDetail;

  constructor() { }

  ngOnInit(): void {
  }

}
