import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $;
@Component({
  selector: 'app-add-report-reason',
  templateUrl: './add-report-reason.component.html',
  styleUrls: ['./add-report-reason.component.css']
})
export class AddReportReasonComponent implements OnInit {

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
  addReasonForm: any;


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
    this.addReasonForm = new FormGroup({
      reportReason: new FormControl('',[Validators.required]),
     
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

    this.serviceCaller.postApi('/api/v1/admin/getReportReasonList',apireq,1).subscribe((success:any)=>{
      if(success.response_code==200){
        this.items = success.Data.docs;
        this.limit = success.Data.limit;
        this.total = success.Data.total; 
      }
      else{
        this.serviceCaller.err("Something went wrong")
      }
    },error=>{
      this.serviceCaller.err("Something went wrong")
    })
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
    this.serviceCaller.postApi("/api/v1/admin/getReportReasonList", this.temp, 0).subscribe((data:any) => {
      if(data.response_code==200){
        this.spinner.hide();
        this.items = data.Data.docs;
        this.pageData = data.data;
        this.srNo = (this.pageNumber - 1) * 10
      }
      else{
        this.spinner.hide();
        this.serviceCaller.err("Something went wrong")
      }
    })
  }

  pagination($event){
    this.pageNumber = $event;
    this.getList();
  }


  delete(id) {
    this.id = id;
  }

  deleteApi() {

    let deleteData = {
      "reportReasonId" : this.id,
      "adminId":localStorage.getItem("_id")
    }

    this.spinner.show();
    this.serviceCaller.postApi("/api/v1/admin/deleteReportReason", deleteData, 0).subscribe((data:any) => {
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

  add_reason_modal(id){
    this.id=id;
  }

  addReason1(data) {

    if (this.addReasonForm.invalid) {
      this.spinner.hide();
      return
    }
    $('#add_reason_modal').modal('hide')
   
    let apireq = {
      "reportReason": data.reportReason,
      "adminId":localStorage.getItem('_id')
    }


    this.spinner.show();
    this.serviceCaller.postApi('/api/v1/admin/addReportReason', apireq, 0).subscribe(success => {
      if (success.response_code == 200) {
        this.addReasonForm.reset();
        this.getList();
      } else {
        this.spinner.hide();
        this.serviceCaller.err("Something went wrong");
      }
    },error=>{
      this.spinner.hide();
      this.serviceCaller.err("Something went wrong")
    })
  }

  reset() {
    this.addReasonForm.controls['reportReason'].setValue(null)
    this.addReasonForm.reset();
  
  }

}
