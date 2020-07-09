import { RouterModule } from '@angular/router';
import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

import { PaymentService } from './payment.service';
import { AuthUserService } from './../auth.user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements AfterViewInit, OnInit, OnDestroy {
  saveThisCard = false;
  isSavedCardAvailable = false;

  @ViewChild('cardInfo') cardInfo: ElementRef;

  card: any;
  emailAddress: any;
  elements: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  savedCardString: string;
  savedCards: any;
  savedCardArray: any;
  isLoggedIn: boolean;
  step = 0;

  constructor(private cd: ChangeDetectorRef,
    private paymentService: PaymentService,
    private userService: AuthUserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.userService.isAuthenticated();
    this.elements = this.paymentService.stripe.elements();
    this.getSavedCardDetails();
  }

  ngAfterViewInit() {
    const style = {
      base: {
        lineHeight: '24px',
        fontFamily: 'monospace',
        fontSmoothing: 'antialiased',
        fontSize: '19px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = this.elements.create('card', { style });
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }

  setStep(index: number) {
    this.step = index;
  }


  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {

    const { token, error } = await this.paymentService.stripe.createToken(this.card);
    if (error) {
      Swal('Error!', error, 'error');
    } else {
      if (this.isLoggedIn) {
        const chargeData = {
          'token': token,
          'amount': 2000,
          'currency': 'usd',
          'saveThisCard': this.saveThisCard
        };
        this.paymentService
          .createCharge(chargeData)
          .subscribe(
            res => { this.showMessageToUser(res); },
            err => { this.stripePaymentError(err); },
          );
      } else {
        const chargeData = {
          'currency': 'usd',
          'amount': 2000,
          'token': token,
          'email': this.emailAddress
        };
        this.paymentService
          .chargeGuestCard(chargeData)
          .subscribe(
            res => { this.showMessageToUser(res); },
            err => { this.stripePaymentError(err); },
          );
      }

    }
  }

  async createSavedCharge(cardIndex) {
    const chargeData = {
      'currency': 'usd',
      'amount': 2000,
      'source': this.savedCards[cardIndex].id
    };

    this.paymentService
      .createSavedCharge(chargeData)
      .subscribe(
        res => { this.showMessageToUser(res); },
        error => { this.stripePaymentError(error); },
      );
  }

  async showMessageToUser(res) {
    if (res.status === 'succeeded') {
      Swal('Success!', 'Payment Successful.', 'success');
      this.router.navigate(['']);
    } else {
      Swal('Error!', res.failureMessage, 'error');
      this.router.navigate(['']);
    }
  }

  async stripePaymentError({ error }) {
    Swal('Error!', error.message, 'error');
  }

  async getSavedCardDetails() {
    if (this.isLoggedIn) {
      this.paymentService.retrieveSavedCard().subscribe(cards => {
        if (cards && cards.length > 0) {
          this.isSavedCardAvailable = true;
          this.savedCards = cards;
        } else {
          this.step = 1;
          this.isSavedCardAvailable = false;
        }
      });
    } else {
      this.step = 1;
      this.isSavedCardAvailable = false;
    }
  }
}
