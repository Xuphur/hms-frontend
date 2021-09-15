import { Component, OnInit } from '@angular/core';
import { AmsService } from 'src/app/ams.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewcontractComponent } from '../newcontract/newcontract.component';
import { ViewcontractComponent } from '../viewcontract/viewcontract.component';
import { NewrecieptComponent } from '../../reciept/newreciept/newreciept.component';
import { ListrecieptComponent } from '../../reciept/listreciept/listreciept.component';

@Component({
  selector: 'app-listcontract',
  templateUrl: './listcontract.component.html',
  styleUrls: ['./listcontract.component.css']
})
export class ListcontractComponent implements OnInit {
  page = 1;
  pageSize: any = '5';
  status: any;
  customer: any;
  type: any;
  month: any;
  contractlist: any = [];
  public isCollapsed = true;

  constructor(
    private amsService: AmsService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.month = new Date().toISOString().substring(0, 10);
    console.log(this.month, 'sadas');
  }

  ngOnInit() {
    this.fetchContracts();
  }

  fetchContracts() {
    this.amsService.getContracts().subscribe(data => {
      this.contractlist = data;
      console.log('all contract found', data);
    });
  }

  open() {
    this.amsService.editMode = false;
    const modalRef = this.modalService.open(NewcontractComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.name = 'New Contract';
  }

  viewContract(_id) {
    console.log(_id, 'this is contract id');
    this.amsService.Id = _id;
    const modalRef = this.modalService.open(ViewcontractComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.name = 'View Contract';
    console.log('view contract open');
  }

  edit(_id) {
    this.amsService.Id = _id;
    this.amsService.editMode = true;
    console.log(this.amsService.Id, 'got this contract');
    const modalRef = this.modalService.open(NewcontractComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.user = 'Update Asset';
  }

  searchByStatus(status) {
    console.log(status, 'this is status at contract search');
    if (status === '') {
      this.fetchContracts();
    } else {
      this.amsService.getContractByStatus(status).subscribe((res: any) => {
        this.contractlist = res.data;
        console.log('all contract found by status', this.contractlist);
      });
    }
  }

  searchByMonth(month) {
    const m = new Date(month);
    const findMonth = m.getMonth() + 1;
    for (let i = 0; i < this.contractlist.length; i++) {
      const contract = this.contractlist[i];
      const reaccurance = contract.reaccurance;
      for (let j = 0; j < reaccurance.length; j++) {
        const nxt = reaccurance[j];
        const nxtDate = new Date(nxt.nxtDate);
        const nxtMonth = nxtDate.getMonth() + 1;
        if (findMonth === nxtMonth) {
          contract.nxtDue = nxtDate;
        }
      }
    }
    console.log('all done');
  }

  searchByType(type) {
    console.log(type, 'this is owner at search');
    this.amsService.getAssetByType(type).subscribe((res: any) => {
      this.contractlist = res.data;
      console.log('all asset found by Owner', this.contractlist);
    });
  }

  deleteContract(_id) {
    this.amsService.deleteContract(_id).subscribe(() => {
      this.fetchContracts();
      console.log('delete click');
    });
  }

  addReciept(_id) {
    console.log(_id, 'this is asset id');
    this.amsService.Id = _id;
    const modalRef = this.modalService.open(NewrecieptComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.name = 'New Reciept';
  }

  listReciept(_id) {
    this.amsService.Id = _id;
    console.log(this.amsService.Id, 'this asset Called');
    const modalRef = this.modalService.open(ListrecieptComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.name = 'List Reciept';
  }
}
