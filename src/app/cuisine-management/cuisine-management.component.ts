import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
declare var $: any

@Component({
  selector: 'app-cuisine-management',
  templateUrl: './cuisine-management.component.html',
  styleUrls: ['./cuisine-management.component.css']
})
export class CuisineManagementComponent implements OnInit {

  [x: string]: any;
  searchForm: FormGroup;
  formvalidation: any = { submitted: false }
  cuisineArray: any = [];
  pageNumber = 1;
  limit: any=30
  total: any;
  srNumber: any;
  dateValue: any;
  userId: any;
  id: any;
  nowDate2: any;
  editCuisineForm: any;
  spinnerService: any;
  fileLength: any;
  todayDate: Date;
  addCuisineForm: FormGroup;

  constructor(
    public service: AppService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _location: Location) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.todayDate = new Date()
    this.searchFormVAlue()
    this.getViewData()
    this.editCuisineForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    })

    this.addCuisineForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    })

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

  getViewData() {

    let apireq = {
      "limit": this.limit,
      "pageNumber": this.pageNumber,
      "search": "",
    }

    this.spinner.show();
    this.service.postApi('/api/v1/admin/getCuisineList', apireq, 0).subscribe((success: any) => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.cuisineArray = success.Data.docs;
        this.limit = success.Data.limit;
        this.total = success.Data.total;
        this.srNumber = (this.pageNumber - 1) * this.limit;
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
      "search": data.search,
      "startDate": (data.startDate == '' || data.startDate == undefined) ? '' : (new Date(data.startDate).toISOString()),
      "endDate": (data.endDate == '' || data.endDate == undefined) ? '' : (new Date(new Date(data.endDate).getTime() + 24 * 60 * 60 * 1000).toISOString()),
    }

    this.service.postApi('/api/v1/admin/getCuisineList', apireq, 0).subscribe((success: any) => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.cuisineArray = success.Data.docs;
        this.limit = success.Data.limit;
        this.total = success.Data.total;
        this.srNumber = (this.pageNumber - 1) * this.limit;
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
      cuisineId: this.id,
    }

    this.service.postApi("/api/v1/admin/deleteCuisine", deleteData, 0).subscribe((data: any) => {
      if (data.response_code == 200) {
        this.service.succ(data.response_message);
        this.getViewData()
      } else {
        this.service.err("Something went wrong")
      }
    })
  }


  openModal(id, userId) {
    this.userId = userId
    $('#' + id).modal({ backdrop: 'static', keyboard: false });
  }

  changeDate() {
    this.dateValue = new Date(this.searchForm.value.formDate)
  }


  addCuisineApi(data) {

    this.formvalidation.submitted = true
    if (this.addCuisineForm.invalid) {
      return
    }
    this.spinner.show();
    $('#addCuisine').modal('hide')

    let apireq = {
      name: data.name,
    }

    this.service.postApi('/api/v1/admin/addCuisine', apireq, 0).subscribe(success => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.addCuisineForm.reset();
        $("#addCuisine").modal('hide')
        this.formvalidation.submitted = false
        this.getViewData()
        this.service.succ(success.response_message)
      } 
      else if (success.response_code == 501) {
        this.spinner.hide();
        this.editCuisineForm.reset();
        this.addCuisineForm.reset();
        this.service.err(success.message)
      }
      else {
        this.spinner.hide();
        this.editCuisineForm.reset();
        this.addCuisineForm.reset();
        this.service.err("Something went wrong")
      }
    }, error => {
      this.spinner.hide();
      this.service.err("Something went wrong")
    })
  }

  editCusine(x) {

     this.id = x._id,
      this.name = x.name,
      this.editCuisineForm.patchValue(x)
  }

  editCuisineApi(data) {

    this.formvalidation.submitted = true
    if (this.editCuisineForm.invalid) {
      return
    }
    this.spinner.show();
    $('#editCusine').modal('hide')

    let apireq = {
      name: data.name,
      cuisineId:this.id
    }

    this.service.postApi('/api/v1/admin/updateCuisine', apireq, 0).subscribe(success => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.editCuisineForm.reset();
        this.addCuisineForm.reset();
        $("#editCusine").modal('hide')
        this.formvalidation.submitted = false
        this.service.succ(success.response_message)
        this.getViewData()
      } else if (success.response_code == 501) {
        this.spinner.hide();
        this.editCuisineForm.reset();
        this.addCuisineForm.reset();
        this.service.err(success.response_message)
      }
      else {
        this.spinner.hide();
        this.editCuisineForm.reset();
        this.addCuisineForm.reset();
        this.service.err("Something went wrong")
      }
    }, error => {
      this.spinner.hide();
      this.service.err("Something went wrong")
    })
  }

  reset() {
    this.formvalidation.submitted = false
    this.addCuisineForm.reset()
    this.editCuisineForm.reset()
  }

  backClicked() {
    this._location.back();
  }

}
