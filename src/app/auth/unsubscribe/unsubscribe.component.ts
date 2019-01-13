import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BPAuthService } from '../bp-auth.service';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit {
  errors: string;
  constructor(
    private route: ActivatedRoute,
    private bpAuthService: BPAuthService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.bpAuthService.unsubscribe(params['id'])
          .subscribe((data: any) => {
            this.errors = null;
           });
      }
    });
  }

}
