import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $;
@Component({
  selector: 'app-currency-professional-management',
  templateUrl: './currency-professional-management.component.html',
  styleUrls: ['./currency-professional-management.component.css']
})
export class CurrencyProfessionalManagementComponent implements OnInit {

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
  userId: any;
  dropDownData2: string[];
  measurementLimitDelivery: any;
  updateOfferLimitForm:any
  minimumOfferLimitDelivery: any;
  updateMeasurementLimitForm: any;
  minimumOfferLimitProfessional: any;
  measurementLimitProfessional: any;
  updateMeasurementLimitAllForm: any;
  updateOfferLimitAllForm: any;
  mailForm: FormGroup;

  constructor(
    private serviceCaller: AppService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.formValidation();
    this.getList();

    this.updateMeasurementLimitForm = new FormGroup({
      measurementLimitProfessional: new FormControl('', [Validators.required])

    })


    this.updateOfferLimitForm = new FormGroup({
      minimumOfferLimitProfessional: new FormControl('', [Validators.required])

    })

    this.updateMeasurementLimitAllForm = new FormGroup({
      measurementLimitProfessional: new FormControl('', [Validators.required])

    })

    this.updateOfferLimitAllForm = new FormGroup({
      minimumOfferLimitProfessional: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required])

    })

    this.mailForm = new FormGroup({
      message: new FormControl('', [Validators.required]),
    
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

    this.serviceCaller.postApi('/api/v1/admin/getUserDataForAccountingProfessional', apireq, 1).subscribe((success: any) => {
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
    this.serviceCaller.postApi("/api/v1/admin/getUserDataForAccountingProfessional", this.temp, 0).subscribe((data: any) => {
      this.items = data.Data.docs;
      this.pageData = data.data;
      this.srNo = (this.pageNumber - 1) * 10
    });
  }

  pagination($event) {
    this.pageNumber = $event;
    this.getList();
  }


  blockApi(status,modal){
    console.log(status,modal);
    let apireq={
      "userId":this.userId,
      "minimumOfferStatusDelivery":status,
      adminId:localStorage.getItem('_id')
    }
    console.log("request is==========>",apireq);
    this.serviceCaller.postApi('/api/v1/admin/updateMinimumOfferStatus',apireq,1).subscribe((success:any)=>{
      if(success.response_code==200){
        this.getList();
        $('#'+modal).modal('hide')
        this.serviceCaller.succ(success.response_message)
      }
      else{
        this.serviceCaller.err("Something went wrong")
      }
    },error=>{
      this.serviceCaller.err("Something went wrong")
    })
  }


  blockApi1(status,modal){
    console.log(status,modal);
    let apireq={
      "userId":this.userId,
      "measurementStatusDelivery":status,
      adminId:localStorage.getItem('_id')
    }
    console.log("request is==========>",apireq);
    this.serviceCaller.postApi('/api/v1/admin/updateMeasurementStatus',apireq,1).subscribe((success:any)=>{
      if(success.response_code==200){
        this.getList();
        $('#'+modal).modal('hide')
        this.serviceCaller.succ(success.response_message)
      }
      else{
        this.serviceCaller.err("Something went wrong")
      }
    },error=>{
      this.serviceCaller.err("Something went wrong")
    })
  }


  openModal(id,userId){
    this.userId=userId
    $('#'+id).modal({ backdrop: 'static', keyboard: false });
  }

  updateMeasurementLimit(x) {
    console.log("x is========>",x);
    this.id = x._id;
    this.measurementLimitProfessional = x.measurementLimitProfessional
    this.updateMeasurementLimitForm.patchValue({
      measurementLimitProfessional: x.measurementLimitProfessional,
 
    });
  }


  updateMeasurementLimit1(data) {

    if (this.updateMeasurementLimitForm.invalid) {
      return
    }
    $('#updateMeasurementLimit').modal('hide')

    let apireq = {
      measurementLimitProfessional: data.measurementLimitProfessional,
      userId:this.id,
      adminId:localStorage.getItem('_id')
    }
   console.log("request is=============>",apireq);
    this.serviceCaller.postApi('/api/v1/admin/updateMeasurementStatus', apireq, 0).subscribe(success => {
      if (success.response_code == 200) {
        this.getList();
        this.updateMeasurementLimitForm.reset();
      } else {
        console.log(success.response_message)
      }
    }, error => {
      console.log("Something went wrong")
    })
  }


  updateOfferLimit(x) {
    console.log("x is========>",x);
    this.id = x._id;
    this.minimumOfferLimitProfessional = x.minimumOfferLimitProfessional
    this.updateOfferLimitForm.patchValue({
      minimumOfferLimitProfessional: x.minimumOfferLimitProfessional,
 
    });
  }


  updateOfferLimit1(data) {

    if (this.updateOfferLimitForm.invalid) {
      return
    }
    $('#updateOfferLimit').modal('hide')

    let apireq = {
      minimumOfferLimitProfessional: data.minimumOfferLimitProfessional,
      userId: this.id,
      adminId:localStorage.getItem('_is')
    }

    this.serviceCaller.postApi('/api/v1/admin/updateMinimumOfferStatus', apireq, 0).subscribe(success => {
      if (success.response_code == 200) {
        this.getList();
        this.updateOfferLimitForm.reset();
      } else {
        console.log(success.response_message)
      }
    }, error => {
      console.log("Something went wrong")
    })
  }

  updateMeasurementLimitAll1(data) {
    console.log("data is=========>",data);
    if (this.updateMeasurementLimitAllForm.invalid) {
      return
    }
    $('#updateMeasurementLimitAll').modal('hide')

    let apireq = {
      measurementLimitProfessional:data.measurementLimitProfessional,
      adminId:localStorage.getItem('_id')
    }
    console.log("request is========>",apireq);
    this.serviceCaller.postApi('/api/v1/admin/updateMeasurementAllProfessional', apireq, 0).subscribe(success => {
      if (success.response_code == 200) {
        this.getList();
      } else {
        console.log(success.response_message)
      }
    }, error => {
      console.log("Something went wrong")
    })
  }

  updateOfferLimitAll1(data) {
    console.log("data is=========>",data);
    if (this.updateOfferLimitAllForm.invalid) {
      return
    }
    $('#updateOfferLimitAll').modal('hide')

    let apireq = {
      minimumOfferLimitProfessional:data.minimumOfferLimitProfessional,
      country:data.country,
      adminId:localStorage.getItem('_id')
    }
    console.log("request is========>",apireq);
    this.serviceCaller.postApi('/api/v1/admin/updateOfferAllProfessional', apireq, 0).subscribe(success => {
      if (success.response_code == 200) {
        this.getList();
      } else {
        console.log(success.response_message)
      }
    }, error => {
      console.log("Something went wrong")
    })
  }

  mail(id){
    console.log("id is",id)
    this.id=id;
  }

  sendMail(data) {

    if (this.mailForm.invalid) {
      return
    }
    $('#mail').modal('hide')
   
    let apireq = {

      userId:this.id,
      message: data.message,
      adminId:localStorage.getItem("_id")
    }
    this.serviceCaller.postApi('/api/v1/admin/sendMail', apireq, 0).subscribe(success => {
      if (success.response_code == 200) {
        this.serviceCaller.succ(success.response_message);
        this.mailForm.reset();
      } else {
        this.serviceCaller.err(success.response_message);
      }
    },error=>{
      this.serviceCaller.err("Something went wrong")
    })
  }

  cancelModal() {
    this.mailForm.reset()
 
  }
  reset() {
    this.mailForm.controls['message'].setValue(null)
  
  }

 


}
