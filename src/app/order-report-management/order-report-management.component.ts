import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $;
@Component({
  selector: 'app-order-report-management',
  templateUrl: './order-report-management.component.html',
  styleUrls: ['./order-report-management.component.css']
})
export class OrderReportManagementComponent implements OnInit {

  searchForm: any;
  temp: any = {};
  items: any =[];
  pageNumber:number = 1;
  limit:number=10;
  srNo:any;
  pageData:any;
  id: any;
  search: any;
  total:any;
  params:any;
  addLanguageForm: any;
  nowDate2: any;
  todayDate: Date;
  mailForm: FormGroup;
  commentData: any;


  constructor(
    private serviceCaller : AppService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.formValidation();
    this.getList();
    window.scrollTo(0, 0);
    this.todayDate = new Date()
    this.mailForm = new FormGroup({
      message: new FormControl('', [Validators.required]),
    
    })
  }
   
  getId(){
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;
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
    searchFilter(data){

    let apireq={  

      "limit" : 10,  
      "pageNumber" : this.pageNumber,
      "search" : data.search,
      "startDate": (data.startDate == '' || data.startDate == undefined) ? '' : (new Date(data.startDate).toISOString()),
      "endDate": (data.endDate == '' || data.endDate == undefined) ? '' : (new Date(new Date(data.endDate).getTime() + 24 * 60 * 60 * 1000).toISOString()),
    }

    this.serviceCaller.postApi('/api/v1/admin/getOrderReport',apireq,1).subscribe((success:any)=>{
      if(success.response_code==200){
        this.items = data.Data.docs;
        this.limit = data.Data.limit;
        this.total = data.Data.total;
        this.srNo = (this.pageNumber - 1) * 10;
        this.pageData = data.Data;
      
      }
      else{
        this.serviceCaller.err("Something went wrong")
      }
    },error=>{
      this.serviceCaller.err("Something went wrong")
    })
  }

  openModal(comment){
    this.commentData = comment
    $('#commentModal').modal({ backdrop: 'static', keyboard: false });
  }

  formValidation(){
    this.searchForm = new FormGroup({
      search : new FormControl('',),
      startDate : new FormControl('',),
      endDate : new FormControl('',)
    
    })
  }

  getList() {

    this.temp.search = "";
    this.temp.limit = this.limit;
    this.temp.pageNumber = this.pageNumber;

    this.spinner.show();
    this.serviceCaller.postApi("/api/v1/admin/getOrderReport", this.temp, 0).subscribe((data:any) => {
      if( data.response_code == 200 ) {
        this.spinner.hide();
        this.items = data.Data.docs;
        this.limit = data.Data.limit;
        this.total = data.Data.total;
        this.srNo = (this.pageNumber - 1) * 10;
        this.pageData = data.Data;
      }
      else{
        this.serviceCaller.err("Something went wrong")
      }
    })
  }

  pagination($event){
    this.pageNumber = $event;
    this.getList();
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

  reset(){
    this.mailForm.reset()
  }

 


}
