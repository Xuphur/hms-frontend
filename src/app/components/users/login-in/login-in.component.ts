import { Component, OnInit } from '@angular/core';
import { AmsService } from 'src/app/ams.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user.model';
import swal from 'sweetalert';
import { AuthguardService } from 'src/app/authguard.service';
@Component({
  selector: 'app-login-in',
  templateUrl: './login-in.component.html',
  styleUrls: ['./login-in.component.css'],
  providers: [AmsService]
})
export class LoginInComponent implements OnInit {

  user: any;
  loginvalue: any;

  constructor(
    private authService: AuthguardService,
    private route: ActivatedRoute,
    private router: Router,
    private amsService: AmsService,
    ) {
      this.user = new User();
      this.route.paramMap.subscribe(parameterMap => {
        const id = parameterMap.get('id');
        this.amsService.getUserById(id);
      });
    }

  ngOnInit() {
  }

  getuser(user) {
    this.amsService.getUser(user).subscribe((loginData) => {
      localStorage.setItem('loginvalue', JSON.stringify(loginData));
      // this.authService.isLoggIn = true;
      this.router.navigate(['/asset/list']);
      swal(
        'User Log In Successfully'
      );
    });
  }
}
