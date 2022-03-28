import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $;
@Component({
  selector: 'app-view-offer-list',
  templateUrl: './view-offer-list.component.html',
  styleUrls: ['./view-offer-list.component.css']
})
export class ViewOfferListComponent implements OnInit {

  temp:any = {};
  items:any = {};
  pageNumber:number = 1;
  limit:number=10;
  srNo:any;
  pageData:any;
  postForm:any;
  search:any = "";
  id: any;
  status: any;
  temp1: any;
  dateValue: any;
  todayDate: Date;
  nowDate2: any;
  total: any;
  makeOfferById: any;
  userId: any;
  offerId: any;
  orderId: any;
  commentData: any;
  mailForm: any;

  constructor(
    private serviceCaller : AppService,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getId();
    window.scrollTo(0, 0);
    this.todayDate = new Date()
    this.postForm = new FormGroup({
      search: new FormControl(),
      startDate : new FormControl('',),
      endDate : new FormControl('',)
    });
    this.getList();
    this.mailForm = new FormGroup({
      message: new FormControl('', [Validators.required]),
    
    })
  }

  Changed(event){
    if (event) {
      this.nowDate2 = event;
    }
    else{
      this.nowDate2 = ''
    }
  }

  fromMaxDate(event) {
    if (event) {
      this.todayDate = new Date(event)
    } else {
      this.todayDate = new Date()
    }
  }

  searchFilter(data) {

    let apireq={        
      "limit" : 10,  
      "pageNumber" : this.pageNumber,
      "search" : data.search,
      "orderId":this.id,
      "startDate": (data.startDate == '' || data.startDate == undefined) ? '' : (new Date(data.startDate).toISOString()),
      "endDate": (data.endDate == '' || data.endDate == undefined) ? '' : (new Date(new Date(data.endDate).getTime() + 24 * 60 * 60 * 1000).toISOString()),
      
    }

    this.spinner.show();
    this.serviceCaller.postApi("/api/v1/admin/getOfferList", apireq, 0).subscribe((data:any) => {
      if( data.response_code == 200 ) {
        this.spinner.hide();
        this.items = data.Data.docs;
        this.limit = data.Data.limit;
        this.total = data.Data.total;
        this.srNo = (this.pageNumber - 1) * 10;
        this.pageData = data.Data;
      }
      else{
        this.serviceCaller.err("Something went wrong");
      }
    })
  }

  delete(x) {

    this.id = x._id;
    this.makeOfferById=x.makeOfferById._id
  }

  deleteApi() {

    let deleteData = {
      "orderId" : this.id,
      "userId":this.makeOfferById,
      "adminId":localStorage.getItem('_id')
    }
    
    this.spinner.show();
    this.serviceCaller.postApi("/api/v1/admin/deleteOffer", deleteData, 0).subscribe((data:any) => {
      if(data.response_code == 200) {
        this.spinner.hide();
        this.getList();
        this.serviceCaller.succ(data.response_message);
      } else {
        this.spinner.hide();
        this.serviceCaller.err("Something went wrong");
      }
    })
  }

  delete2(x) {

    this.userId=x.orderOwner
    this.offerId=x._id
    this.orderId=x.realOrderId
  }
 
  deleteApi2() {

    let deleteData = {
      "orderId" :this.orderId,
      "offerId": this.offerId,
      "userId":this.userId,
      "adminId":localStorage.getItem("_id")
    }
  
    this.spinner.show();
    this.serviceCaller.postApi("/api/v1/admin/acceptOffer", deleteData, 0).subscribe((data:any) => {
      if(data.response_code == 200) {
        this.spinner.hide();
        this.getList();
        this.serviceCaller.succ(data.response_message);
      } else {
        this.spinner.hide();
        this.serviceCaller.err("Something went wrong");
      }
    })
  }


  getId(){
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      console.log(params)
    });
  }



  getList() {

    let apireq={        
      "limit" : 10,  
      "pageNumber" : this.pageNumber,
      "search" : "",
      "orderId":this.id
    }
    
    this.spinner.show();
    this.serviceCaller.postApi("/api/v1/admin/getOfferList",apireq, 0).subscribe((data:any) => {
      if( data.response_code == 200 ) {
        this.spinner.hide();
        this.items = data.Data.docs;
        this.limit = data.Data.limit;
        this.total = data.Data.total;
        this.srNo = (this.pageNumber - 1) * 10;
        this.pageData = data.Data;
      }
      else{
        this.spinner.hide();
        this.serviceCaller.err("Something went wrong");
      }
    })
  }

  pagination(event){
    this.pageNumber = event
    this.getList()
  }

  changeDate(){
    this.dateValue = new Date(this.postForm.value.formDate)
  }
  openModal(comment){
    this.commentData = comment
    $('#commentModal').modal({ backdrop: 'static', keyboard: false });
  }



  cancel(x) {

    this.id = x._id;
  }

  cancelApi() {

    let deleteData = {
      "orderId" : this.id,
      "adminId":localStorage.getItem("_id")
    }

    this.spinner.show();
    this.serviceCaller.postApi("/api/v1/admin/cancelOrderByworker", deleteData, 0).subscribe((data:any) => {
      if(data.response_code == 200) {
        this.spinner.hide();
        this.getList();
        this.serviceCaller.succ(data.response_message);
      } else {
        this.spinner.hide();
        this.serviceCaller.err("Something went wrong");
      }
    })
  }

  mail(id){
    console.log("id is",id)
    this.id=id;
  }

  sendMail(data) {

    this.spinner.show();
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
        this.spinner.hide();
        this.serviceCaller.succ(success.response_message);
        this.mailForm.reset();
      } else {
        this.spinner.hide();
        this.serviceCaller.err("Something went wrong");
      }
    },error=>{
      this.spinner.hide();
        this.serviceCaller.err("Something went wrong");
    })
  }


  cancelModal() {
    this.mailForm.reset()
 
  }
  reset() {
    this.mailForm.controls['message'].setValue(null)
  
  }



}
