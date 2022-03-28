import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
declare var $: any

@Component({
  selector: 'app-store-type',
  templateUrl: './store-type.component.html',
  styleUrls: ['./store-type.component.css']
})
export class StoreTypeComponent implements OnInit {

  [x: string]: any;
  searchForm: FormGroup;
  formvalidation: any = { submitted: false }
  breedArray: any = [];
  pageNumber = 1;
  limit: any=30
  total: any;
  srNumber: any;
  dateValue: any;
  storeId: any;
  id: any;
  nowDate2: any;
  editBreedForm: any;
  spinnerService: any;
  fileLength: any;
  todayDate: Date;
  addBreedForm: FormGroup;
  dropDownData:any=[]
  resAndStoreId:any

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
    
    this.editBreedForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
     
    })
    this.addBreedForm = new FormGroup({
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
      "limit": 10,
      "pageNumber": this.pageNumber,
      "search": "",
    }

    this.spinner.show();
    this.service.postApi('/api/v1/admin/getStoreTypeList', apireq, 1).subscribe((success: any) => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.breedArray = success.Data.docs;
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
      "limit": 10,
      "pageNumber": this.pageNumber,
      "search": data.search,
      "startDate": (data.startDate == '' || data.startDate == undefined) ? '' : (new Date(data.startDate).toISOString()),
      "endDate": (data.endDate == '' || data.endDate == undefined) ? '' : (new Date(new Date(data.endDate).getTime() + 24 * 60 * 60 * 1000).toISOString()),
    }

    this.service.postApi('/api/v1/admin/getStoreTypeList', apireq, 1).subscribe((success: any) => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.breedArray = success.Data.docs;
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


  openModal(id, storeId) {
    this.storeId = storeId
    $('#' + id).modal({ backdrop: 'static', keyboard: false });
  }

  changeDate() {
    this.dateValue = new Date(this.searchForm.value.formDate)
  }


  editBreed(x) {

    this.id = x._id,
    this.editBreedForm.patchValue(x)
      
  }

  editBreedApi(data) {

    this.formvalidation.submitted = true
    if (this.editBreedForm.invalid) {
      return
    }
    this.spinner.show();
    $('#editBreed').modal('hide')


    let apireq = {
      name: data.name,
      storeId: this.id,
    }

    this.service.postApi('/api/v1/admin/updateStoreType', apireq, 0).subscribe(success => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.editBreedForm.reset();
        $("#editBreed").modal('hide')
        this.service.succ(success.response_message)
        this.getViewData()
      } else if (success.response_code == 501) {
        this.spinner.hide();
        this.service.err(success.response_message)
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


  addBreedApi(data) {

    this.formvalidation.submitted = true
    if (this.addBreedForm.invalid) {
      return
    }
    this.spinner.show();
    $('#addBreed').modal('hide')


    let apireq = {
      name: data.name,
    }

    this.service.postApi('/api/v1/admin/addStoreType', apireq, 0).subscribe(success => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.addBreedForm.reset();
        $("#addBreed").modal('hide')
        this.service.succ(success.response_message)
        this.getViewData()
      } else if (success.response_code == 501) {
        this.spinner.hide();
        this.service.err(success.response_message)
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

  blockApi(status, modal) {

    let apireq = {
      "storeId": this.storeId,
      "status": status
    }

    this.service.postApi('/api/v1/admin/updateStatusStoreType', apireq, 0).subscribe((success: any) => {

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

  reset() {
    this.formvalidation.submitted = false
    this.editBreedForm.reset()
  }

  backClicked() {
    this._location.back();
  }


}
