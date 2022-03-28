import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $;
@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})
export class AccountingComponent implements OnInit {

  searchForm: any;
  temp: any = {};
  items: any = {};
  pageNumber: number = 1;
  limit: number = 10;
  srNo: any;
  pageData: any;
  id: any;
  search: any;
  total: any;
  params: any;
  editAccountForm: any;
  currency: any;
  taxInPercentage: any;
  region: any;
  dropDownData: string[];
  dropDownData1: string[];

  constructor(
    private serviceCaller: AppService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.formValidation();
    this.getList();

    this.editAccountForm = new FormGroup({
      currency: new FormControl('', [Validators.required]),
      taxInPercentage: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required]),

    })

    this.dropDownData = ['Rupee', 'SAR'],
    this.dropDownData1 = ['Arab', 'India']
  }

  getId() {
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;
      console.log(this.id);
    });
  }
  searchFilter(data) {
    console.log(data)
    let apireq = {
      "limit": 10,
      "pageNumber": this.pageNumber,
      "search": data.search,
    }

    this.serviceCaller.postApi('/api/v1/admin/getAccountData', apireq, 1).subscribe((success: any) => {
      if (success.response_code == 200) {
        this.items = success.Data.docs;
        this.limit = success.Data.limit;
        this.total = success.Data.total;

      }
      else {
        this.serviceCaller.err(success.response_message)
      }
    }, error => {
      this.serviceCaller.err("Something went wrong")
    })
  }

  formValidation() {
    this.searchForm = new FormGroup({
      search: new FormControl(''),

    })
  }

  getList() {
    this.temp.search = "";
    this.temp.limit = this.limit;
    this.temp.pageNumber = this.pageNumber;
    this.serviceCaller.postApi("/api/v1/admin/getAccountData", this.temp, 0).subscribe((data: any) => {
      this.items = data.Data.docs;
      this.pageData = data.data;
      this.srNo = (this.pageNumber - 1) * 10
    });
  }

  pagination($event) {
    this.pageNumber = $event;
    this.getList();
  }

  edit_account_modal(x) {
    this.id = x._id;
    this.currency = x.currency
    this.taxInPercentage = x.taxInPercentage
    this.region = x.region
    this.editAccountForm.patchValue({
      currency: x.currency,
      taxInPercentage: x.taxInPercentage,
      region: x.region,
    });
  }


  editAccount(data) {

    if (this.editAccountForm.invalid) {
      return
    }
    $('#edit_account_modal').modal('hide')

    let apireq = {
      currency: data.currency,
      taxInPercentage: data.taxInPercentage,
      region: data.region,
      accountId: this.id,
      adminId:localStorage.getItem('_id')
    }

    this.serviceCaller.postApi('/api/v1/admin/updateAccountData', apireq, 0).subscribe(success => {
      if (success.response_code == 200) {
        this.getList();
      } else {
        console.log(success.response_message)
      }
    }, error => {
      console.log("Something went wrong")
    })
  }

  reset(){
    this.editAccountForm.reset()
  }

}
