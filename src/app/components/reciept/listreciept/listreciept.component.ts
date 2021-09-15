import { Component, OnInit } from '@angular/core';
import { AmsService } from '../../../ams.service';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listreciept',
  templateUrl: './listreciept.component.html',
  styleUrls: ['./listreciept.component.css']
})
export class ListrecieptComponent implements OnInit {
  recieptlist: any;
  closeResult: string;
  grandTotal: any;
  balance: any;
  contract: any;

  constructor(
    private amsService: AmsService,
    private router: Router,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    console.log('i m called in listrec');
    this.fetchReciept();
  }

  fetchReciept() {
    this.amsService
      .getRecieptById(this.amsService.Id)
      .subscribe((data: any) => {
        this.recieptlist = data.data;
        const total = this.getTotal(this.recieptlist);
        this.grandTotal = total;
        console.log(this.recieptlist, 'this is reciept data');
        this.amsService
          .getContractById(this.amsService.Id)
          .subscribe((con: any) => {
            this.contract = con.data;
            const blnc = this.contract.totalPayable - this.grandTotal;
            this.balance = blnc;
            console.log(blnc, 'got this blnc');
          });
      });
  }

  getTotal(data) {
    let amount = 0;
    let total = 0;
    data.forEach(element => {
      amount = parseInt(element.recivedAmount, 10);
      console.log(amount, 'this is amount');
      total += amount;
    });
    return total;
  }

  // getBalance(data) {
  //   let amount = 0;
  //   let total = this.grandTotal;
  //   // data.forEach(element => {
  //   //   amount = parseInt(element.recivedAmount, 10);
  //   //   console.log(amount, 'this is amount');
  //     total += amount;
  //   });
  //   return total;
  // }

  fetchContractById() {
    this.amsService
      .getContractById(this.amsService.Id)
      .subscribe((data: any) => {
        this.contract = data.data;
        console.log(this.amsService.Id, this.contract, 'got this asset');
      });
  }

  close() {
    this.activeModal.close();
  }
}
