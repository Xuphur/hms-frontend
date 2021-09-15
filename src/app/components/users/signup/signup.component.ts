import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user.model';
import Swal from 'sweetalert';
import { AmsService } from 'src/app/ams.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: any;


  constructor(
    private amsService: AmsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.user = new User();
    this.route.paramMap.subscribe(parameterMap => {
      const id = parameterMap.get('id');
      this.amsService.getUserById(id);
    });
  }

  ngOnInit() {
  }

  save(user) {
    console.log(user, 'this is new asset'),
      this.amsService.addUser(user).subscribe(() => {
        Swal(
          'Assest Inserted Successfully'
        );
      });
  }
}
