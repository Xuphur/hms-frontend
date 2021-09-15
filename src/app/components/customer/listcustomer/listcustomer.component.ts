import { Component, OnInit } from '@angular/core';
import { AmsService } from 'src/app/ams.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewcustomerComponent } from '../newcustomer/newcustomer.component';
import { ViewcustomerComponent } from '../viewcustomer/viewcustomer.component';

@Component({
  selector: 'app-listcustomer',
  templateUrl: './listcustomer.component.html',
  styleUrls: ['./listcustomer.component.css']
})
export class ListcustomerComponent implements OnInit {
  page = 1;
  pageSize: any = '5';
  name: any;
  cnic: any;
  mobile: any;
  customerlist: any = [];
  public isCollapsed = true;

  constructor(
    private amsService: AmsService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.fetchCustomers();
  }

  fetchCustomers() {
    this.amsService.getCustomers().subscribe(data => {
      this.customerlist = data;
      console.log('all customer found', data);
    });
  }

  edit(_id) {
    this.amsService.Id = _id;
    this.amsService.editMode = true;
    console.log(this.amsService.Id, 'got this customer');
    const modalRef = this.modalService.open(NewcustomerComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.user = 'Update Customer';
  }

  open() {
    this.amsService.editMode = false;
    this.amsService.Id = null;
    const modalRef = this.modalService.open(NewcustomerComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.name = 'New Customer';
  }

  deleteCustomer(_id) {
    this.amsService.deleteCustomer(_id).subscribe(() => {
      this.fetchCustomers();
      console.log('delete click');
    });
  }

  viewCustomer(id) {
    this.amsService.Id = id;
    const modalRef = this.modalService.open(ViewcustomerComponent, { size: 'lg', backdrop : 'static'  });
    modalRef.componentInstance.name = 'View Customer';
  }

  searchByName(name) {
    console.log(name, 'this is Name at search');
    this.amsService.getCustomerByName(name).subscribe((res: any) => {
      this.customerlist = res.data;
      console.log('all customer found bt Name', this.customerlist);
    });
  }

  searchByCnic(cnic) {
    console.log(cnic, 'this is cnic at search');
    this.amsService.getCustomerByCnic(cnic).subscribe((res: any) => {
      this.customerlist = res.data;
      console.log('all customer found by Cnic', this.customerlist);
    });
  }

  searchByMobile(mobile) {
    console.log(mobile, 'this is mobile at search');
    this.amsService.getCustomerByMobile(mobile).subscribe((res: any) => {
      this.customerlist = res.data;
      console.log('all customer found by Mobile', this.customerlist);
    });
  }
}
