import { Component, OnInit } from '@angular/core';
import { SecurityService } from './security.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})

export class SecurityComponent implements OnInit {
  security: any;
  constructor(private securityService: SecurityService) { }

  ngOnInit() {
  }

  submit = (form) => {
    const ticker = form.value.ticker;
    console.log(form.value);
    this.securityService.getData(ticker)
      .subscribe(data => {
        this.security = data;
        console.log(this.security);
      })
  }
}
