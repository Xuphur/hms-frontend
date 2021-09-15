import { Component, OnInit } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AmsService } from 'src/app/ams.service';
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
    private amsService: AmsService,
  ) { }

  ngOnInit() {
    this.getCustomerById();
  }
  getCustomerById() {
    this.amsService
    .getCustomerById(this.amsService.Id)
    .subscribe((res: any) => {
      this.customer = res.data;
      console.log(this.amsService.Id, this.customer, 'customer at view');
      this.amsService.getContractByCustomer(this.amsService.Id).subscribe(( responce: any) => {
        this.contractlist = responce.data;
        console.log(this.contractlist, 'this is contract list');
      });
    });
}

close() {
  this.activeModal.close();
}

}



