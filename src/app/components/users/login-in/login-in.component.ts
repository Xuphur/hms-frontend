import { Component, OnInit } from '@angular/core';
import { HmsService } from 'src/app/hms.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user.model';
import swal from 'sweetalert';
import { AuthguardService } from 'src/app/authguard.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from '../signup/signup.component';
@Component({
  selector: 'app-login-in',
  templateUrl: './login-in.component.html',
  styleUrls: ['./login-in.component.css'],
  providers: [HmsService]
})
export class LoginInComponent implements OnInit {

  user: any;
  loginvalue: any;

  constructor(
    private authService: AuthguardService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private hmsService: HmsService,
    ) {
      this.user = new User();
      this.route.paramMap.subscribe(parameterMap => {
        const id = parameterMap.get('id');
        this.hmsService.getUserById(id);
      });
    }

  ngOnInit() {
  }

  getuser(user) {
    this.hmsService.getUser(user).subscribe((loginData) => {
      localStorage.setItem('loginvalue', JSON.stringify(loginData));
      this.router.navigate(['']);
      window.location.reload();
      swal(
        'User Log In Successfully'
      );
    });
  }

  open() {
    this.hmsService.editMode = false;
    this.hmsService.Id = null;
    const modalRef = this.modalService.open(SignupComponent, { size: 'lg', backdrop : 'static'  });
    modalRef.componentInstance.name = 'New Asset';
  }

}
