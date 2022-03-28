import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
declare var $: any


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  [x: string]: any;
  searchForm: FormGroup;
  formvalidation: any = { submitted: false }
  userArr: any = [];
  pageNumber = 1;
  limit = 50
  total: any;
  srNumber: any;
  dateValue: any;
  userId: any;
  id: any;
  email: any;
  editUserForm: any;
  nowDate2: any;
  spinnerService: any;
  flag: number;
  buttonDisable: number;
  formdata = new FormData
  fileLength: any;
  todayDate: Date;
  countryCode: any;
  mobileNumber: any;
  notificationType: any
  type: any


  constructor(
    public service: AppService,
    public router: Router,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private _location: Location) { }

  ngOnInit() {
    this.getId()
    window.scrollTo(0, 0);
    this.todayDate = new Date()
    this.searchFormVAlue()
    this.getViewData()
  }

  notificationFun(data) {
    this.notificationType = data
  }

  getId() {
    this.activatedRoute.params.subscribe(paramsId => {
      this.type = paramsId.id
    });
  }

  Changed(event) {
    if (event) {
      this.nowDate2 = event;
    }
    else {
      this.nowDate2 = ''
    }
  }
  searchFormVAlue() {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl('')
    })
  }

  pagination(event) {
    this.pageNumber = event
    this.getViewData()
  }

  openNewTab(data) {
    window.open(data, '_blank');
  }

  getViewData() {

    let apireq = {
      "limit": this.limit,
      "pageNumber": this.pageNumber,
      type: this.type
    }

    this.spinner.show();
    this.service.postApi('/api/v1/admin/getRestaurantList', apireq, 0).subscribe((success: any) => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.userArr = success.Data.docs;
        this.limit = success.Data.limit;
        this.total = success.Data.total;
        this.srNumber = (this.pageNumber - 1) * 10;
      }
      else {
        this.spinner.hide();
        this.service.err("Something went wrong")
      }
    }, error => {
      this.spinner.hide();
      this.service.err("Something went wrong")
    })
  }



  fromMaxDate(event) {
    if (event) {
      this.todayDate = new Date(event)
    } else {
      this.todayDate = new Date()
    }
  }

  search(data) {

    let apireq = {
      "limit": this.limit,
      "pageNumber": this.pageNumber,
      type: this.type,
      "search": data.search,
      "startDate": (data.startDate == '' || data.startDate == undefined) ? '' : (new Date(data.startDate).toISOString()),
      "endDate": (data.endDate == '' || data.endDate == undefined) ? '' : (new Date(new Date(data.endDate).getTime() + 24 * 60 * 60 * 1000).toISOString()),
    }

    this.service.postApi('/api/v1/admin/getRestaurantList', apireq, 0).subscribe((success: any) => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.userArr = success.Data.docs;
        this.limit = success.Data.limit;
        this.total = success.Data.total;
        this.srNumber = (this.pageNumber - 1) * 10;
      }
      else {
        this.spinner.hide();
        this.service.err("Something went wrong")
      }
    }, error => {
      this.service.err("Something went wrong")
    })
  }

  delete(X) {
    this.id = X._id;
  }

  deleteApi() {

    let deleteData = {
      "resAndStoreId": this.id,
    }

    this.service.postApi("/api/v1/admin/deleteResAndStore", deleteData, 0).subscribe((data: any) => {
      if (data.response_code == 200) {
        this.service.succ(data.response_message);
        this.getViewData()
      } else {
        this.service.err("Something went wrong")
      }
    })
  }

  blockApi(status, modal) {

    let apireq = {
      "resAndStoreId": this.userId,
      "status": status
    }

    this.service.postApi('/api/v1/admin/updateSellerStatus', apireq, 0).subscribe((success: any) => {

      if (success.response_code == 200) {
        this.getViewData()
        $('#' + modal).modal('hide')
        this.service.succ(success.response_message)
      }
      else {
        $('#' + modal).modal('hide')
        this.service.err("Something went wrong")
      }
    }, error => {
      $('#' + modal).modal('hide')
      this.service.err("Something went wrong")
    })
  }

  blockApi1(status, modal) {

    let apireq = {
      "resAndStoreId": this.userId,
      "status": status
    }

    this.service.postApi('/api/v1/admin/updateSellerOfferStatus', apireq, 0).subscribe((success: any) => {

      if (success.response_code == 200) {
        this.getViewData()
        $('#' + modal).modal('hide')
        this.service.succ(success.response_message)
      }
      else {
        $('#' + modal).modal('hide')
        this.service.err("Something went wrong")
      }
    }, error => {
      $('#' + modal).modal('hide')
      this.service.err("Something went wrong")
    })
  }

  rejectApi(status, modal) {

    let apireq = {
      "resAndStoreId": this.userId,
      "adminVerifyStatus": 'Approve',
    }

    this.spinner.show();
    this.service.postApi('/api/v1/admin/updateSellerDocumentStatus', apireq, 0).subscribe((success: any) => {

      if (success.response_code == 200) {
        this.spinner.hide();
        this.getViewData()
        $('#' + modal).modal('hide')
        this.service.succ(success.response_message)
      }
      else {
        this.spinner.hide();
        this.service.err("Something went wrong")
      }
    }, error => {
      this.spinner.hide();
      this.service.err("Something went wrong")
    })
  }

  openModal(id, userId) {
    this.userId = userId
    $('#' + id).modal({ backdrop: 'static', keyboard: false });
  }

  changeDate() {
    this.dateValue = new Date(this.searchForm.value.formDate)

  }


  backClicked() {
    this._location.back();
  }



}
