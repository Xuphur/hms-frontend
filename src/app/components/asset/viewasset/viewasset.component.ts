import { Component, OnInit } from '@angular/core';
import { AmsService } from 'src/app/ams.service';
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
    private amsService: AmsService
  ) {}

  ngOnInit() {
    this.fetchAssetById();
  }

  fetchAssetById() {
    this.amsService.getAssetById(this.amsService.Id).subscribe((res: any) => {
      this.asset = res.data;
      console.log(this.amsService.Id, this.asset, 'asset at view');
    });
  }
  close() {
    this.activeModal.close();
  }
}
