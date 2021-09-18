import { Component, OnInit } from '@angular/core';
import { Contract } from 'src/app/contract.model';
import { HmsService } from 'src/app/hms.service';
import {
  NgbModal,
  NgbActiveModal,
  ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-viewcontract',
  templateUrl: './viewcontract.component.html',
  styleUrls: ['./viewcontract.component.css']
})
export class ViewcontractComponent implements OnInit {
  contract: any;
  constructor(
    public activeModal: NgbActiveModal,
    private hmsService: HmsService
  ) {}

  ngOnInit() {
    this.fetchContractById();
  }
  fetchContractById() {
    this.hmsService
      .getContractById(this.hmsService.Id)
      .subscribe((res: any) => {
        this.contract = res.data;
        console.log(this.hmsService.Id, this.contract, 'contract at view');
      });
  }

  close() {
    this.activeModal.close();
  }
}
