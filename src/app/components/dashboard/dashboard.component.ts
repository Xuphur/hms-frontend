import { Component, OnInit } from '@angular/core';
import { AmsService } from '../../ams.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  contractlist: any;
  month: any;
  recieptlist: any;
  closeResult: string;
  grandTotal: any;
  thisMonthTotal: any;
  lastMonthTotal: any;
  balance: any;
  contract: any;
  recieptArray = [];
  lastArray = [];
  thisArray = [];

  constructor(
    private amsService: AmsService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.month = new Date().toISOString().substring(0, 10);
    console.log(this.month, 'this is month');
    // this.fetchContracts();
    this.fetchReciept();
  }

  ngOnInit() {
  }

  fetchContracts() {
    this.amsService.getContracts().subscribe(data => {
      this.contractlist = data;
      console.log('all contract found', data);
      this.searchByMonth(this.month);
    });
  }

  searchByMonth(month) {
    const m = new Date(month);
    console.log(m, 'this is m');
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

  fetchReciept() {
    this.amsService
      .getReciept()
      .subscribe((data: any) => {
        this.recieptlist = data.data;
        //
        this.getLastMonth();
        this.getThisMonth();
        this.grandTotal = this.getTotal(this.recieptlist);
      });
  }

getLastMonth() {
  const m = new Date(this.month);
  console.log(m, 'this is m');
  const findMonth = m.getMonth();
  //
  for (let i = 0; i < this.recieptlist.length; i++) {
  let reciept = this.recieptlist[i];
    const rMonth = new Date (reciept.recieptDate).getMonth() + 1;
    if (findMonth === rMonth) {
      this.lastArray.push(reciept);
  }
  }
  const total = this.getTotal(this.lastArray);
  this.lastMonthTotal = total;
}

getThisMonth() {
  const m = new Date(this.month);
  console.log(m, 'this is m');
  const findMonth = m.getMonth() + 1;
  //
  for (let i = 0; i < this.recieptlist.length; i++) {
  let reciept = this.recieptlist[i];
    const rMonth = new Date (reciept.recieptDate).getMonth() + 1;
    if (findMonth === rMonth) {
      this.thisArray.push(reciept);
  }
  }
  const total = this.getTotal(this.thisArray);
  this.thisMonthTotal = total;
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
}
