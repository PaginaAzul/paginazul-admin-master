import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { MomentModule } from 'angular2-moment';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $;

@Component({
  selector: 'app-payment-management',
  templateUrl: './payment-management.component.html',
  styleUrls: ['./payment-management.component.css']
})
export class PaymentManagementComponent implements OnInit {

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
    this.serviceCaller.postApi("/api/v1/admin/getadminPaymentList", apireq, 0).subscribe((data:any) => {
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
    this.router.navigate(['../../admin/orderProductDetail/'+detail._id]);
  }



  getList() {

    let apireq={        
      "limit" : 10,  
      "pageNumber" : this.pageNumber,
      "search" : "",
      type:this.type,
    }

    this.spinner.show();
    this.serviceCaller.postApi("/api/v1/admin/getadminPaymentList",apireq, 0).subscribe((data:any) => {
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




  cancelModal() {
    this.mailForm.reset()
 
  }
  reset() {
    this.mailForm.controls['message'].setValue(null)
  
  }


}
