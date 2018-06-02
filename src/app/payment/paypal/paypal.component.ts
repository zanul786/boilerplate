import { Component, AfterViewChecked, OnInit } from '@angular/core';

declare let paypal: any;

@Component({
  selector: 'paypal-root',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {

  public didPaypalScriptLoad: boolean = false;
  public loading: boolean = true;

  public paymentAmount: number = 2000;

  public paypalConfig: any = {
    env: 'sandbox',
    client: {
      sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
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
        // show success page
      });
    }
  };
  public ngOnInit(): void{
    $.getScript( 'https://www.paypalobjects.com/api/checkout.js', function() {
      paypal.Button.render(this.paypalConfig, '#paypal-button');
      this.loading = false;
    });
  }
  
  public ngAfterViewChecked(): void {
    if(!this.didPaypalScriptLoad) {
      this.loadPaypalScript().then(() => {
          paypal.Button.render(this.paypalConfig, '#paypal-button');
          this.loading = false;
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