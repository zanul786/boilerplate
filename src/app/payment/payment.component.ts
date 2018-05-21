import { Component,
        AfterViewInit,
        OnInit,
        OnDestroy,
        ViewChild,
        ElementRef,
        ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentService } from './payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements AfterViewInit, OnInit, OnDestroy {
  saveThisCard = false;

  @ViewChild('cardInfo') cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  savedCardString: string;

  constructor(private cd: ChangeDetectorRef,
    private paymentService: PaymentService
  ) {}

  ngOnInit(){
    this.getSavedCardDetails();
  };

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

    this.card = elements.create('card', { style });
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
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
    const { token, error } = await stripe.createToken(this.card);
    if (error) {
      console.log('Something is wrong:', error);
    } else {
      this.paymentService
      .createCharge(token, this.saveThisCard)
      .subscribe(res => {
        console.log(res);
      });
    }
  }

  async createSavedCharge(form: NgForm) {
      this.paymentService
      .createSavedCharge()
      .subscribe(res => {
        console.log(res);
      });
  }

  async getSavedCardDetails(){
    this.paymentService.retrieveSavedCard().subscribe(card => {
      this.savedCardString = `${card.brand} card ending with ${card.last4} expiry:${card.exp_month}/${card.exp_year}`
    });
  }
}
