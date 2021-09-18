import { Component, OnInit } from '@angular/core';
import { HmsService } from '../../../hms.service';
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
    private hmsService: HmsService,
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
    reciept.contractId = this.hmsService.Id;
    console.log(this.hmsService.Id, 'receipt is');
    this.hmsService.addReciept(reciept).subscribe(() => {
      this.router.navigate(['/']);
      this.close();
    });
  }
  close() {
    this.activeModal.close();
  }
}
