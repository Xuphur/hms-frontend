import { Component, OnInit } from '@angular/core';
import { AmsService } from '../../../ams.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Reciept } from 'src/app/reciept.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-newreciept',
  templateUrl: './newreciept.component.html',
  styleUrls: ['./newreciept.component.css']
})
export class NewrecieptComponent implements OnInit {
  reciept: Reciept;

  constructor(
    private amsService: AmsService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {
    this.reciept = new Reciept();
  }

  ngOnInit() {}

  addReciept(reciept) {
    console.log(reciept, 'this is new reciept');
    reciept.contractId = this.amsService.Id;
    console.log(this.amsService.Id, 'receipt is');
    this.amsService.addReciept(reciept).subscribe(() => {
      this.router.navigate(['/']);
      this.close();
    });
  }
  close() {
    this.activeModal.close();
  }
}
