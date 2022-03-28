import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $;
@Component({
  selector: 'app-report-management',
  templateUrl: './report-management.component.html',
  styleUrls: ['./report-management.component.css']
})
export class ReportManagementComponent implements OnInit {
  searchForm: any;
  temp: any = {};
  items: any = {};
  pageNumber:number = 1;
  limit:number=10;
  srNo:any;
  pageData:any;
  id: any;
  search: any;
  total:any;
  commentData: any;
  mailForm: FormGroup;

  constructor(
    private serviceCaller : AppService,
    private router : Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.formValidation();
    this.getList();
    this.mailForm = new FormGroup({
      message: new FormControl('', [Validators.required]),
    
    })
  }
   
  searchFilter(data){

    let apireq={        
      "limit" : 10,  
      "pageNumber" : this.pageNumber,
      "search" : data.search,
      "startDate": (data.startDate == '' || data.startDate == undefined) ? '' : (new Date(data.startDate).toISOString()),
      "endDate": (data.endDate == '' || data.endDate == undefined) ? '' : (new Date(new Date(data.endDate).getTime() + 24 * 60 * 60 * 1000).toISOString()),
    }

    this.spinner.show();
    this.serviceCaller.postApi('/api/v1/admin/contactUsList',apireq,1).subscribe((success:any)=>{
      if(success.response_code==200){
        this.spinner.hide();
        this.items = success.Data.docs;
        this.limit = success.Data.limit;
        this.total = success.Data.total;
        this.srNo = (this.pageNumber - 1) * 10;
        this.pageData = success.Data;
      }
      else{
        this.spinner.hide();
        this.serviceCaller.err("Something went wrong")
      }
    },error=>{
      this.spinner.hide();
      this.serviceCaller.err("Something went wrong")
    })
  }
   


  formValidation(){
    this.searchForm = new FormGroup({
      search : new FormControl('',),
     
    })
  }

  getList() {

    this.temp.search = "";
    this.temp.limit = this.limit;
    this.temp.pageNumber = this.pageNumber;

    this.spinner.show();
    this.serviceCaller.postApi("/api/v1/admin/contactUsList", this.temp, 0).subscribe((data:any) => {
      if(data.response_code==200){
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


  pagination($event){
    this.pageNumber = $event;
    this.getList();
  }

  
  delete(id) {
    this.id = id;
  }

  deleteApi() {

    let deleteData = {
      "contactUsId" : this.id,
      "adminId":localStorage.getItem("_id")
    }

    this.spinner.show();
    this.serviceCaller.postApi("/api/v1/admin/deleteAdminContact", deleteData, 0).subscribe((dataR:any) => {
      if(dataR.response_code == 200) {
        this.spinner.hide()
        this.getList();
        this.serviceCaller.succ(dataR.response_message);
      } else {
        this.spinner.hide()
        this.serviceCaller.err("Something went wrong");
      }
    })
  }

  openModal(comment){
    this.commentData = comment
    $('#commentModal').modal({ backdrop: 'static', keyboard: false });
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
