import { Component, OnInit } from '@angular/core';
import { Contract } from 'src/app/contract.model';
import { AmsService } from 'src/app/ams.service';
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
    private amsService: AmsService
  ) {}

  ngOnInit() {
    this.fetchContractById();
  }
  fetchContractById() {
    this.amsService
      .getContractById(this.amsService.Id)
      .subscribe((res: any) => {
        this.contract = res.data;
        console.log(this.amsService.Id, this.contract, 'contract at view');
      });
  }

  close() {
    this.activeModal.close();
  }
}
