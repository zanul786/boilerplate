import { Component,
        AfterViewInit,
        OnInit,
        OnDestroy,
        ViewChild,
        ElementRef,
        ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'

import { PaymentService } from './payment.service'; 

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
  cardHandler = this.onChange.bind(this);
  error: string;
  savedCardString: string;
  savedCards: any;
  savedCardArray : any;

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
      Swal(
        'Error!',
        error,
        'error'
      )
  
    } else {
      this.paymentService
      .createCharge(token, this.saveThisCard)
      .subscribe(res => {
        if(res.status === 'succeeded' ){
          Swal(
            'Success!',
            'Payment Successful.',
            'success'
          )
        }else{
          Swal(
            'Error!',
            'Unable to process this request! Contact Administrator.',
            'error'
          )
        }
    });
    }
  }

  async createSavedCharge(cardIndex) {
      this.paymentService
      .createSavedCharge(this.savedCards[cardIndex])
      .subscribe(res => {
        if(res.status === 'succeeded' ){
          Swal(
            'Success!',
            'Payment Successful.',
            'success'
          )
        }else{
          Swal(
            'Error!',
            'Unable to process this request! Contact Administrator.',
            'error'
          )
        }
      });
  }

  async getSavedCardDetails(){
    this.paymentService.retrieveSavedCard().subscribe(cards => {

      if(cards && cards.length > 0) {
        this.isSavedCardAvailable = true;
        this.savedCards = cards;
        const savedCardArray = [];

        cards.forEach( function( card, index){
          savedCardArray.push(
            {
              index : index,
              savedCardString : `${card.brand} card ending with ${card.last4} expiry:${card.exp_month}/${card.exp_year}`
            });
        });
        this.savedCardArray = savedCardArray;
      }else{
        this.isSavedCardAvailable = false;
      }
    });
  }
}
