import { Component } from '@angular/core';
import { AuthguardService } from './authguard.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggIn: any;

  constructor(private authService: AuthguardService) {
    // this.isLoggIn = this.authService.isLoggedIn();
  }

  title = 'Asset Management System';
  logincheck = '';
}
