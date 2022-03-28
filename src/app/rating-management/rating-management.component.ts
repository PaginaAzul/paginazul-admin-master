import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $;
@Component({
  selector: 'app-report-management',
  templateUrl: './rating-management.component.html',
  styleUrls: ['./rating-management.component.css']
})
export class RatingManagementComponent implements OnInit {
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
  editRatingForm: any;
  rate: any;
  ratingMessage: any;
  comments: any;
  commentData: any;

  constructor(
    private serviceCaller: AppService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.formValidation();
    this.getList();

    this.editRatingForm = new FormGroup({
      rate: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]*$/)]),
      ratingMessage: new FormControl('', [Validators.required]),
      comments: new FormControl('', [Validators.required]),

    })
  }

  openModal(comment){
    this.commentData = comment
    $('#commentModal').modal({ backdrop: 'static', keyboard: false });
  }
  getId() {
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;
    });
  }
  searchFilter(data) {

    let apireq = {
      "limit": 10,
      "pageNumber": this.pageNumber,
      "search": data.search,
    }

    this.serviceCaller.postApi('/api/v1/admin/getAllRating', apireq, 1).subscribe((success: any) => {
      if (success.response_code == 200) {
        this.items = success.Data.docs;
        this.limit = success.Data.limit;
        this.total = success.Data.total;
        this.srNo = (this.pageNumber - 1) * 10;
        this.pageData = success.Data;

      }
      else {
        this.serviceCaller.err("Something went wrong")
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

    this.spinner.show();
    this.serviceCaller.postApi("/api/v1/admin/getAllRating", this.temp, 0).subscribe((data: any) => {
      if (data.response_code == 200) {
      this.spinner.hide();
      this.items = data.Data.docs;
      this.limit = data.Data.limit;
      this.total = data.Data.total;
      this.srNo = (this.pageNumber - 1) * 10;
      this.pageData = data.Data;
    }
    else {
      this.spinner.hide();
      this.serviceCaller.err("Something went wrong")
    }
  }, error => {
    this.spinner.hide();
    this.serviceCaller.err("Something went wrong")
  })
  }

  pagination($event) {
    this.pageNumber = $event;
    this.getList();
  }


  delete(id) {
    this.id = id;
  }

  deleteApi() {

    let deleteData = {
      "ratetId": this.id,
      "adminId":localStorage.getItem('_id')
    }

    this.spinner.show();
    this.serviceCaller.postApi("/api/v1/admin/ratingDelete", deleteData, 0).subscribe((data: any) => {
      if (data.response_code == 200) {
        this.spinner.hide();
        this.serviceCaller.succ(data.response_message);
        this.getList();
      } else {
        this.spinner.hide();
        this.serviceCaller.err("Something went wrong");
      }
    })
  }

  edit_rating_modal(x) {

    this.id = x._id;
    this.rate = x.rate
    this.ratingMessage = x.ratingMessage
    this.comments = x.comments
    this.editRatingForm.patchValue({
      rate: x.rate,
      ratingMessage: x.ratingMessage,
      comments: x.comments,
    });
  }

  editRating(data) {

    this.spinner.show();
    if (this.editRatingForm.invalid) {
      this.spinner.hide();
      return
    }
    $('#edit_rating_modal').modal('hide')

    let apireq = {
      rate: data.rate,
      ratingMessage: data.ratingMessage,
      comments: data.comments,
      ratingId: this.id,
      adminId:localStorage.getItem('_id')
    }


    this.serviceCaller.postApi('/api/v1/admin/updateRating', apireq, 0).subscribe(success => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.getList();
        this.serviceCaller.succ(success.response_message);
      } else {
        this.spinner.hide();
        this.serviceCaller.err("Something went wrong");
      }
    }, error => {
      this.spinner.hide();
      this.serviceCaller.err("Something went wrong");
    })
  }

  reset(){
    this.editRatingForm.reset()
  }

}
