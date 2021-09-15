import { Component, OnInit } from '@angular/core';
import { AmsService } from '../../../ams.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Asset } from 'src/app/asset.model';
import {NgbModal, NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert';

@Component({
  selector: 'app-newasset',
  templateUrl: './newasset.component.html',
  styleUrls: ['./newasset.component.css']
})
export class NewassetComponent implements OnInit {

  number: any;
  asset: any;
  activeIdString: String = '';
  closeResult: string;
  constructor(
    private amsService: AmsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.asset = new Asset();
    this.route.paramMap.subscribe(parameterMap => {
      const id = parameterMap.get('id');
      this.amsService.getAssetById(id);
    });
  }
  ngOnInit() {
    if (this.amsService.editMode) {
      this.fetchAssetById();
    }
  }

  fetchAssetById() {
    this.amsService
    .getAssetById(this.amsService.Id)
    .subscribe((res: any) => {
      this.asset = res.data;
      console.log(this.amsService.Id, 'asset at view');
    });
  }

  addAsset(asset) {
    console.log(asset, 'this is new asset');
    if (this.amsService.editMode === true) {
      this.amsService.updateAsset(asset).subscribe(() => {
        Swal(
          'Assest Updated Successfully'
        );
        this.router.navigate([this.router.url])
        this.close();
      });
    } else {
      this.amsService.addAsset(asset).subscribe(() => {
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

}

