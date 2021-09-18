import { Component, OnInit } from '@angular/core';
import { HmsService } from 'src/app/hms.service';
import {
  NgbModal,
  NgbActiveModal,
  ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-viewasset',
  templateUrl: './viewasset.component.html',
  styleUrls: ['./viewasset.component.css']
})
export class ViewassetComponent implements OnInit {
  asset: any;

  //  vehicle: Boolean = true;
  //  house: Boolean = true;
  //  item: Boolean = true;
  constructor(
    public activeModal: NgbActiveModal,
    private hmsService: HmsService
  ) {}

  ngOnInit() {
    this.fetchAssetById();
  }

  fetchAssetById() {
    this.hmsService.getAssetById(this.hmsService.Id).subscribe((res: any) => {
      this.asset = res.data;
      console.log(this.hmsService.Id, this.asset, 'asset at view');
    });
  }
  close() {
    this.activeModal.close();
  }
}
