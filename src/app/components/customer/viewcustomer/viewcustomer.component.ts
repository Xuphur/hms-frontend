import { Component, OnInit } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { HmsService } from 'src/app/hms.service';
@Component({
  selector: 'app-viewcustomer',
  templateUrl: './viewcustomer.component.html',
  styleUrls: ['./viewcustomer.component.css']
})
export class ViewcustomerComponent implements OnInit {

  customer: any;
  contractlist: any;
  isCollapsed = true;

  constructor(
    public activeModal: NgbActiveModal,
    private hmsService: HmsService,
  ) { }

  ngOnInit() {
    this.getCustomerById();
  }
  getCustomerById() {
    this.hmsService
    .getCustomerById(this.hmsService.Id)
    .subscribe((res: any) => {
      this.customer = res.data;
      console.log(this.hmsService.Id, this.customer, 'customer at view');
      this.hmsService.getContractByCustomer(this.hmsService.Id).subscribe(( responce: any) => {
        this.contractlist = responce.data;
        console.log(this.contractlist, 'this is contract list');
      });
    });
}

close() {
  this.activeModal.close();
}

}



