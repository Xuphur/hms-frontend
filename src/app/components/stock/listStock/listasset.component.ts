import { Component, OnInit, Inject } from '@angular/core';
import { Asset } from '../../../asset.model';
import { HmsService } from '../../../hms.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NewassetComponent } from '../newStock/newasset.component';
// import { NewrecieptComponent } from '../../reciept/newreciept/newreciept.component';
// import { ListrecieptComponent } from '../../reciept/listreciept/listreciept.component';
import { ViewassetComponent } from '../viewStock/viewasset.component';

@Component({
  selector: 'app-listasset',
  templateUrl: './listasset.component.html',
  styleUrls: ['./listasset.component.css']
})
export class ListassetComponent implements OnInit {
  page = 1 ;
  pageSize: any = '5';
  title: any = '';
  owner: any = '';
  type: any = '';
  assetlist: any = [];
  foundAsset: any;
  closeResult: string;
  public isCollapsed = true;

  constructor(
    private hmsService: HmsService,
    private router: Router,
    private modalService: NgbModal
  ) {
     // this.asset = assetData.asset;
  }

  ngOnInit() {
    this.fetchAssets();
  }

  fetchAssets() {
    this.hmsService
    .getAssets()
    .subscribe(data => {
      this.assetlist = data;
      console.log('all asset found', data);
    });
  }

  edit(_id) {
    this.hmsService.Id = _id;
    this.hmsService.editMode = true;
    console.log(_id, 'this is asset id');
      const modalRef = this.modalService.open(NewassetComponent, { size: 'lg', backdrop : 'static'  });
      modalRef.componentInstance.name = 'Update Asset';
    }

  search(title) {
    if (title === '') {
      this.fetchAssets();
    } else {
      console.log(title, 'this is title at search');
      this.hmsService
      .getAsset(title)
      .subscribe((res: any) => {
        this.assetlist = res.data;
        console.log('all asset found bt Title', this.assetlist);
      });
    }
    }

  searchByOwner(owner) {
    if (owner === '') {
      this.fetchAssets();
    } else {
    console.log(owner, 'this is owner at search');
    this.hmsService
    .getAssetByOwner(owner)
    .subscribe((res: any) => {
      this.assetlist = res.data;
      console.log('all asset found by Owner', this.assetlist);
    });
    }
  }

  searchByType(type) {
    if (type === '') {
      this.fetchAssets();
    } else {
    console.log(type, 'this is owner at search');
    this.hmsService
    .getAssetByType(type)
    .subscribe((res: any) => {
      this.assetlist = res.data;
      console.log('all asset found by Owner', this.assetlist);
    });
    }
  }

  deleteAsset(_id) {
    this.hmsService.deleteAsset(_id).subscribe(() => {
      this.fetchAssets();
    console.log('delete click');
    });
  }

  open() {
    this.hmsService.editMode = false;
    this.hmsService.Id = null;
    const modalRef = this.modalService.open(NewassetComponent, { size: 'lg', backdrop : 'static'  });
    modalRef.componentInstance.name = 'New Asset';
  }

  viewAsset(_id) {
    console.log(_id, 'this is asset id');
    this.hmsService.Id = _id;
      const modalRef = this.modalService.open(ViewassetComponent, { size: 'lg', backdrop : 'static'  });
      modalRef.componentInstance.asset = _id;
    console.log('view asset open');
  }

}
