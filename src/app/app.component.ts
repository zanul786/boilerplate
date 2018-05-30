import { Component } from '@angular/core';
import { AuthGuard } from './auth/auth-guard.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( router: Router) {
    if (AuthGuard) {
      router.navigate(['home']);
    }
  }
}
