import { Component, AfterViewChecked, OnInit } from '@angular/core';

declare let paypal: any;

@Component({
  selector: 'paypal-root',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements AfterViewChecked {

  public didPaypalScriptLoad: boolean = false;
  public loading: boolean = true;

  public paymentAmount: number = 20;

  public paypalConfig: any = {
    env: 'sandbox',
    client: {
      sandbox: 'AXG7SxD3vnp1YfY77SRmSxWpM-CcSbkV0IjyK20xRuiIp5M78asYYQE13gWIvFWX7XpPGiqkVpkzeZJk',
      production: 'xxxxxxxxxx'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.paymentAmount, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        console.log(payment);
      });
    },
    onCancel: function(data, actions) {
      /*
       * Buyer cancelled the payment
       */
    },

    onError: function(err) {
      /*
       * An error occurred during the transaction
       */
    }

  };
  
  public ngAfterViewChecked(): void {
    const elementExists: boolean = !!document.getElementById('paypal-button');
    if(elementExists && !this.didPaypalScriptLoad) {
      this.loadPaypalScript().then(() => {
          this.loading = false;
          paypal.Button.render(this.paypalConfig, '#paypal-button');
      });
    }
  }

  public loadPaypalScript(): Promise<any> {
    this.didPaypalScriptLoad = true;
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      document.body.appendChild(scriptElement);
      scriptElement.onload = resolve;
    });
  }
}