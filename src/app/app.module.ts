import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListassetComponent } from './components/asset/listasset/listasset.component';

import { AmsService } from './ams.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NewassetComponent } from './components/asset/newasset/newasset.component';
import { NewrecieptComponent } from './components/reciept/newreciept/newreciept.component';
import { ListrecieptComponent } from './components/reciept/listreciept/listreciept.component';
import { ViewassetComponent } from './components/asset/viewasset/viewasset.component';
import { NewcustomerComponent } from './components/customer/newcustomer/newcustomer.component';
import { ListcustomerComponent } from './components/customer/listcustomer/listcustomer.component';
import { ViewcustomerComponent } from './components/customer/viewcustomer/viewcustomer.component';
import { NewcontractComponent } from './components/contract/newcontract/newcontract.component';
import { ListcontractComponent } from './components/contract/listcontract/listcontract.component';
import { ViewcontractComponent } from './components/contract/viewcontract/viewcontract.component';
import { DashboardComponent } from './components//dashboard/dashboard.component';
import { SidebarComponent } from './components//Dashboard/sidebar/sidebar.component';
import { HeaderComponent } from './components//Dashboard/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { LoginInComponent } from './components/users/login-in/login-in.component';
import { SignupComponent } from './components/users/signup/signup.component';
import { AuthguardService } from './authguard.service';
import { MainComponent } from './components/reports/main/main.component';
import { BaseComponent } from './components/base/base.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ListassetComponent,
    NewassetComponent,
    NewrecieptComponent,
    ListrecieptComponent,
    ViewassetComponent,
    NewcustomerComponent,
    ListcustomerComponent,
    ViewcustomerComponent,
    NewcontractComponent,
    ListcontractComponent,
    ViewcontractComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    SearchComponent,
    LoginInComponent,
    SignupComponent,
    MainComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // tslint:disable-next-line: deprecation
    FormsModule,
    NgbModule
  ],
  entryComponents: [
    NewassetComponent,
    NewrecieptComponent,
    ListrecieptComponent,
    ViewassetComponent,
    NewcustomerComponent,
    ListcustomerComponent,
    ViewcustomerComponent,
    NewcontractComponent,
    ListcontractComponent,
    ViewcontractComponent
  ],
  providers: [AmsService, AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
