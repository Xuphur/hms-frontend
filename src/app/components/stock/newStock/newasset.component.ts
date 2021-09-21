import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HmsService } from '../../../hms.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Asset } from 'src/app/asset.model';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert';

@Component({
  selector: 'app-newasset',
  templateUrl: './newasset.component.html',
  styleUrls: ['./newasset.component.css']
})
export class NewassetComponent implements OnInit {

  number: any;
  asset: any;
  obj: any;
  detail = [];
  activeIdString: String = '';
  closeResult: string;

  constructor(
    private hmsService: HmsService,
    private router: Router,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.asset = new Asset();
    this.asset.assetDetail = [];
    this.route.paramMap.subscribe(parameterMap => {
      const id = parameterMap.get('id');
      this.hmsService.getAssetById(id);
    });
  }
  ngOnInit() {
    this.obj = new Asset
    this.detail.push(this.obj);
    if (this.hmsService.editMode) {
      this.fetchAssetById();
    }
  }

  cal(changes: SimpleChanges, obj: any) {
    this.obj.itemTotal = this.obj.weight * this.obj.pricekg
    console.log(this.obj.itemTotal)
  }

  fetchAssetById() {
    this.hmsService
      .getAssetById(this.hmsService.Id)
      .subscribe((res: any) => {
        this.asset = res.data;
        console.log(this.hmsService.Id, 'asset at view');
      });
  }

  TabKey() {
    this.obj = new Asset
    this.detail.push(this.obj)
    console.log(this.obj, "this is new asset detail")
    // console.log(this.asset.assetDetail, 'tab key pressed');
  }

  addAsset(asset) {
    console.log(asset, 'this is new asset');
    if (this.hmsService.editMode === true) {
      this.hmsService.updateAsset(asset).subscribe(() => {
        Swal(
          'Assest Updated Successfully'
        );
        this.router.navigate([this.router.url])
        this.close();
      });
    } else {
      this.asset.assetDetail.push(this.detail);
      this.hmsService.addAsset(asset).subscribe(() => {
        Swal(
          'Assest Inserted Successfully'
        );
        this.router.navigateByUrl('/route');
      });
    }
  }

  close() {
    this.activeModal.close();
  }

  deleteAsset(i) {
    if (i < 1 ) {
      this.close();
    } else {
      this.detail.splice(i);
    }
  }
}

