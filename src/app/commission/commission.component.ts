import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
declare var $: any

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.css']
})
export class CommissionComponent implements OnInit {

  [x: string]: any;
  searchForm: FormGroup;
  formvalidation: any = { submitted: false }
  breedArray: any = [];
  pageNumber = 1;
  limit: any=30
  total: any;
  srNumber: any;
  dateValue: any;
  userId: any;
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
    this.myList()
    window.scrollTo(0, 0);
    this.todayDate = new Date()
    this.searchFormVAlue()
    
    this.getViewData()
    
    this.editBreedForm = new FormGroup({
      resAndStoreId: new FormControl('', [Validators.required]),
      deliveryCharge: new FormControl('', [Validators.required,Validators.pattern(/^(\d*\.)?\d+$/)]),
      commission: new FormControl('', [Validators.required,Validators.pattern(/^(\d*\.)?\d+$/)])
    })

    this.addBreedForm = new FormGroup({
      resAndStoreId: new FormControl('', [Validators.required]),
      deliveryCharge: new FormControl('', [Validators.required,Validators.pattern(/^(\d*\.)?\d+$/)]),
      commission: new FormControl('', [Validators.required,Validators.pattern(/^(\d*\.)?\d+$/)])
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


  myList() {


    this.service.getApi('/api/v1/admin/getSellerList').subscribe((res: any) => {
      if (res.response_code == 200) {
        this.dropDownData = res.Data
      }
    }, error => {
      console.log(error)
      this.service.err("Something went wrong")
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
    this.service.postApi('/api/v1/admin/getCommissinList', apireq, 1).subscribe((success: any) => {
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

    this.service.postApi('/api/v1/admin/getCommissinList', apireq, 1).subscribe((success: any) => {
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

  delete(X) {
    this.id = X._id;
  }

  deleteApi() {

    let deleteData = {
      "commissionId": this.id,
    }

    this.service.postApi("/api/v1/admin/deleteCommission", deleteData, 1).subscribe((data: any) => {
      if (data.response_code == 200) {
        this.service.succ(data.message);
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


  addBreedApi(data) {

    this.formvalidation.submitted = true
    if (this.addBreedForm.invalid) {
      return
    }
    this.spinner.show();
    $('#addBreed').modal('hide')

    let apireq = {
      commission: data.commission,
      deliveryCharge: data.deliveryCharge,
      resAndStoreId: data.resAndStoreId
    }

    this.service.postApi('/api/v1/admin/addCommission', apireq, 1).subscribe(success => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.addBreedForm.reset();
        $("#addBreed").modal('hide')
        this.getViewData()
        this.service.succ(success.response_message)
      } 
      else if (success.response_code == 501) {
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

  editBreed(x) {

    this.id = x._id,
    this.resAndStoreId=x.resAndStoreId._id
    this.editBreedForm.patchValue(x)
    this.editBreedForm.get('resAndStoreId').setValue(this.resAndStoreId);
      
  }

  editBreedApi(data) {

    this.formvalidation.submitted = true
    if (this.editBreedForm.invalid) {
      return
    }
    this.spinner.show();
    $('#editBreed').modal('hide')


    let apireq = {
      commission: data.commission,
      deliveryCharge: data.deliveryCharge,
      resAndStoreId: data.resAndStoreId,
      commissionId: this.id,
    }

    this.service.postApi('/api/v1/admin/updateCommission', apireq, 1).subscribe(success => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.editBreedForm.reset();
        this.addBreedForm.reset()
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

  reset() {
    this.formvalidation.submitted = false
    this.addBreedForm.reset()
    this.editBreedForm.reset()
  }

  backClicked() {
    this._location.back();
  }

}
