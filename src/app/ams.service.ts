import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class AmsService {
  Id: String;
  editMode: Boolean = false;
  isLoggIn: Boolean = true;
  url = 'http://localhost:4000';
  //  url = 'https://ams-backend.herokuapp.com';

  constructor(
    private http: HttpClient,
    private modalService: NgbModal
    ) {}

  // Asset CRUDs
  getAssets() {
    return this.http.get(this.url + '/asset/list');
  }

  getAsset(item) {
    return this.http.get(this.url + '/asset/one/' + item);
  }

  getAssetById(id) {
    console.log(id, 'id at service to edit');
    return this.http.get(this.url + '/asset/' + id);
  }

  getAssetByOwner(owner) {
    console.log(owner, 'id at service to edit');
    return this.http.get(this.url + '/asset/owner/' + owner);
  }

  getAssetByType(type) {
    console.log(type, 'id at service to edit');
    return this.http.get(this.url + '/asset/type/' + type);
  }

  addAsset(asset) {
    console.log(asset, 'this is asset at service');
    return this.http.post(this.url + '/asset/new', asset);
  }

  updateAsset(asset) {
    console.log(asset._id, 'update at asset service');
    return this.http.put(this.url + '/asset/update/' + asset._id, asset);
  }
  changeAsset(asset) {
    console.log(asset._id, 'update at asset service');
    return this.http.put(this.url + '/asset/update/' + asset._id, asset);
  }

  deleteAsset(id) {
    console.log('Asset Delete');
    return this.http.get(this.url + '/asset/delete/' + id);
  }
  // User CRUDs
  getUsers() {
    return this.http.get(this.url + '/user/list');
  }

  getUser(user) {
    return this.http.post(this.url + '/user/signin', user);
  }

  getUserById(id) {
    console.log(id, 'id at service to edit');
    return this.http.get(this.url + '/user/' + id);
  }

  addUser(user) {
    console.log(user, 'this is user at service');
    return this.http.post(this.url + '/user/new', user);
  }

  updateUser(user) {
    console.log(user._id, 'update at user service');
    return this.http.put(this.url + '/user/update/' + user._id, user);
  }

  deleteUser(id) {
    console.log('user Delete');
    return this.http.get(this.url + '/user/delete/' + id);
  }

  // Reciept CRUDs

  getReciept() {
    return this.http.get(this.url + '/reciept/all');
  }

  getRecieptById(id) {
    console.log(id, 'this is asset at service');
    return this.http.get(this.url + '/reciept/list/' + id);
  }

  addReciept(reciept) {
    console.log(reciept, 'this is reciept at service');
    return this.http.post(this.url + '/reciept/new', reciept);
  }

  updateReciept(reciept) {
    console.log(reciept._id, 'update at reciept service');
    return this.http.put(this.url + '/reciept/update/' + reciept._id, reciept);
  }

  deleteReciept(id) {
    console.log('Reciept Delete');
    return this.http.get(this.url + '/reciept/delete/' + id);
  }

  // Customer CRUDs
  find(customer) {
    console.log(customer, 'this is search value at service');
    return this.http.get(this.url + '/customer/find/' + customer);
  }

  getCustomers() {
    return this.http.get(this.url + '/customer/list');
  }

  getCustomerByName(name) {
    return this.http.get(this.url + '/customer/name/' + name);
  }

  getCustomerById(id) {
    console.log(id, 'id at service to edit');
    return this.http.get(this.url + '/customer/' + id);
  }

  getCustomerByCnic(cnic) {
    console.log(cnic, 'id at service to edit');
    return this.http.get(this.url + '/customer/cnic/' + cnic);
  }

  getCustomerByMobile(mobile) {
    console.log(mobile, 'id at service to edit');
    return this.http.get(this.url + '/customer/mobile/' + mobile);
  }

  addCustomer(customer) {
    return this.http.post(this.url + '/customer/new', customer);
  }

  updateCustomer(customer) {
    console.log(customer._id, 'update at customer service');
    return this.http.put(
      this.url + '/customer/update/' + customer._id,
      customer
    );
  }

  deleteCustomer(id) {
    console.log('Customer Delete');
    return this.http.get(this.url + '/customer/delete/' + id);
  }

  // Contract CRUDs
  getContracts() {
    return this.http.get(this.url + '/contract/list');
  }

  getContractByStatus(status) {
    return this.http.get(this.url + '/contract/status/' + status);
  }

  getContractById(id) {
    console.log(id, 'id at service to edit');
    return this.http.get(this.url + '/contract/' + id);
  }

  getContractByMonth(month) {
    console.log(month, 'month at service to search');
    return this.http.get(this.url + '/contract/month/' + month);
  }

  getContractByCustomer(customer) {
    console.log(customer, 'contract by customer');
    return this.http.get(this.url + '/contract/customer/' + customer);
  }

  addContract(contract) {
    console.log(contract, 'this is contract at service');
    return this.http.post(this.url + '/contract/new', contract);
  }

  updateContract(contract) {
    console.log(contract._id, 'update at asset service');
    return this.http.put(
      this.url + '/contract/update/' + contract._id,
      contract
    );
  }

  deleteContract(id) {
    console.log('Contract Delete');
    return this.http.get(this.url + '/contract/delete/' + id);
  }

}
