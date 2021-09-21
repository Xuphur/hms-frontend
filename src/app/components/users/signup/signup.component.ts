import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user.model';
import Swal from 'sweetalert';
import { HmsService } from 'src/app/hms.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: any;


  constructor(
    private hmsService: HmsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal
  ) {
    this.user = new User();
    this.route.paramMap.subscribe(parameterMap => {
      const id = parameterMap.get('id');
      this.hmsService.getUserById(id);
    });
  }

  ngOnInit() {
  }

  save(user) {
    console.log(user, 'this is new asset'),
      this.hmsService.addUser(user).subscribe(() => {
        Swal(
          'User Created Successfully'
        );
      });
  }
  close() {
    this.activeModal.close();
  }
}
