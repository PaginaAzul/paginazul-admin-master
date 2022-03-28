import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { MomentModule } from 'angular2-moment';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $;
@Component({
  selector: 'app-post-management',
  templateUrl: './post-management.component.html',
  styleUrls: ['./post-management.component.css']
})
export class PostManagementComponent implements OnInit {

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
  userId: any;
  item: any;
  items1: any;
  senderImage: any;
  receiverImage: any;
  senderId: any;
  receiverId: any;
  senderName: any;
  receiverName: any;
  items2: any;
  commentData: any;
  mailForm: any;
  viewImageOnModal: any;
  type: any;

  constructor(
    private serviceCaller : AppService,
    private activatedRoute: ActivatedRoute,
    private router : Router,public spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getId()
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

  getId(){
    this.activatedRoute.params.subscribe(paramsId => {
      this.type = paramsId.type;

    });
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
      type:this.type,
      "pageNumber" : this.pageNumber,
      "search" : data.search,
      "startDate": (data.startDate == '' || data.startDate == undefined) ? '' : (new Date(data.startDate).toISOString()),
      "endDate": (data.endDate == '' || data.endDate == undefined) ? '' : (new Date(new Date(data.endDate).getTime() + 24 * 60 * 60 * 1000).toISOString()),
      
    }

    this.spinner.show();
    this.serviceCaller.postApi("/api/v1/admin/orderList", apireq, 0).subscribe((data:any) => {
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

  postDetail(detail) {
    this.router.navigate(['../../admin/postDetails/'+detail._id]);
  }

  postDetail1(x) {
    this.router.navigate(['../viewOfferListManagement/'+x]);
  }

  getList() {

    let apireq={        
      "limit" : 10,  
      "pageNumber" : this.pageNumber,
      "search" : "",
      type:this.type,
    }

    this.spinner.show();
    this.serviceCaller.postApi("/api/v1/admin/orderList",apireq, 0).subscribe((data:any) => {
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

  
  cancelOrder(x) {
    this.id = x._id;
    this.userId=x.userId._id
  }

  cancelApi() {

    let cancelData = {
      "orderId" : this.id,
      "userId":this.userId
    }
    

    this.spinner.show();
    this.serviceCaller.postApi("/api/v1/admin/orderCancel", cancelData, 0).subscribe((data:any) => {
      if(data.response_code == 200) {
        this.spinner.hide();
        this.getList();
        this.serviceCaller.succ(data.response_message);
      } else {
        this.serviceCaller.err("Something went wrong");
      }
    })
  }


  delete(id) {
    this.id = id;
  }

  deleteApi() {

    let deleteData = {
      "orderId": this.id,
    }


    this.spinner.show();
    this.serviceCaller.postApi("/api/v1/admin/orderDelete", deleteData, 0).subscribe((data: any) => {
      if (data.response_code == 200) {
        this.spinner.hide();
        this.getList();
        this.serviceCaller.succ(data.response_message);

      } else {
        this.spinner.hide();
        this.serviceCaller.err("Something went wrong");
      }
    })
  }

  viewImage(professionalId1) {
    $('#image1').modal({ backdrop: 'static', keyboard: false });
    this.viewImageOnModal = professionalId1
  }
  dismissmodal() {
    $('#image1').modal('hide')
  }



  chat(x) {

    let deleteData = {
      "roomId": x.roomId,
    }

    this.spinner.show();
    this.serviceCaller.postApi("/api/v1/admin/getChatHistory", deleteData, 0).subscribe((data: any) => {
      if(data.response_code==200){
        this.spinner.hide();
        this.items1 = data.Data1
        this.senderImage=data.Data1[0].senderData[0].profilePic
        this.receiverImage=data.Data1[0].receiverData[0].profilePic
        this.senderId=x.offerAcceptedOfId
        this.receiverId=x.userId._id
        this.senderName=data.Data1[0].senderData[0].name
        this.receiverName=data.Data1[0].receiverData[0].name
      }
      else if(data.response_code==404){
        this.spinner.hide();
        this.serviceCaller.succ(data.response_message);
      } 
    })
  }

  openModal(comment){
    this.commentData = comment
    $('#commentModal').modal({ backdrop: 'static', keyboard: false });
  }


  mail(id){
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

    this.spinner.show();
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
