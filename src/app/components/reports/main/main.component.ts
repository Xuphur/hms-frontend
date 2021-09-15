import { Component, OnInit } from '@angular/core';
import { AmsService } from '../../../ams.service';
import * as XLSX from 'xlsx';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Reciept } from 'src/app/reciept.model';
type AOA = any[][];
let vm;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  objects: any;
  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  contractlist: any = [];
  month: any;
  page = 1;
  pageSize: any = '5';
  isCollapsed = true;

  constructor(
    private amsService: AmsService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    vm = this;
    this.month = new Date().toISOString().substring(0, 10);
    console.log(this.month, 'this is month');
    this.fetchContracts();
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      vm.data = <AOA>XLSX.utils.sheet_to_json(ws, { header: 1 });

      vm.headers = vm.data[0];
      // Array of arrays To JSON
      const values = vm.data.slice(1);
      vm.objects = values.map((array, index) => {
        const object = {};
        vm.headers.forEach((header, i) => {
          object[header] = array[i] || '';
        });
        return object;
      });
      console.log('Console Log Objects ', vm.objects);
    };
    reader.readAsBinaryString(target.files[0]);
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

  fetchContracts() {
    this.amsService.getContracts().subscribe(data => {
      this.contractlist = data;
      console.log('all contract found', data);
      this.searchByMonth(this.month);
    });
  }

  saveReciept() {
    for (let i = 0; i < this.objects.length; i++) {
      // console.log(this.objects[i], 'this is one object');
      const reciept = this.objects[i];
      this.amsService.addReciept(reciept).subscribe(() => {
      console.log(reciept, 'this is saved reciept');
      });
    }
  }
  saveAssets() {
    for (let i = 0; i < this.objects.length; i++) {
      // console.log(this.objects[i], 'this is one object');
      const asset = this.objects[i];
      this.amsService.addAsset(asset).subscribe(() => {
      console.log(asset, 'this is saved asset');
      });
    }
  }
  saveCustomers() {
    for (let i = 0; i < this.objects.length; i++) {
      // console.log(this.objects[i], 'this is one object');
      const customer = this.objects[i];
      this.amsService.addCustomer(customer).subscribe(() => {
      console.log(customer, 'this is saved customer');
      });
    }
  }
  saveContracts() {
    for (let i = 0; i < this.objects.length; i++) {
      // console.log(this.objects[i], 'this is one object');
      const contract = this.objects[i];
      this.amsService.addContract(contract).subscribe(() => {
      console.log(contract, 'this is saved contract');
      });
    }
  }

  ngOnInit() {}
}
