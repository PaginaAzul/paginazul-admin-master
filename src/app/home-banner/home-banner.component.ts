import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
declare var $: any

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css']
})
export class HomeBannerComponent implements OnInit {

  @ViewChild('fileUploader') fileUploader: ElementRef;
  @ViewChild('fileUploader1') fileUploader1: ElementRef;
  [x: string]: any;
  searchForm: FormGroup;
  formvalidation: any = { submitted: false }
  categoryArray: any = [];
  pageNumber = 1;
  limit: any=30
  total: any;
  srNumber: any;
  dateValue: any;
  userId: any;
  id: any;
  nowDate2: any;
  editCateoryForm: any;
  spinnerService: any;
  fileLength: any;
  todayDate: Date;
  uploadFile:any=[]
  image:any

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

    this.editCateoryForm = new FormGroup({
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
      "limit": this.limit,
      "pageNumber": this.pageNumber,
      "search": "",
    }

    this.spinner.show();
    this.service.postApi('/api/v1/admin/getHomeBannerList', apireq, 0).subscribe((success: any) => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.categoryArray = success.Data.docs;
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

  blockApi(status, modal) {

    let apireq = {
      "serviceId": this.userId,
      "status": status,
    }

    this.spinner.show();
    this.service.postApi('/api/v1/admin/updateStatusMainService', apireq, 0).subscribe((success: any) => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.getViewData()
        $('#' + modal).modal('hide')
        this.serviceCaller.succ(success.response_message)
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

 


  fromMaxDate(event) {
    if (event) {
      this.todayDate = new Date(event)
    } else {
      this.todayDate = new Date()
    }
  }

  search(data) {

    let apireq = {
      "limit": this.limit,
      "pageNumber": this.pageNumber,
      "search": data.search,
      "startDate": (data.startDate == '' || data.startDate == undefined) ? '' : (new Date(data.startDate).toISOString()),
      "endDate": (data.endDate == '' || data.endDate == undefined) ? '' : (new Date(new Date(data.endDate).getTime() + 24 * 60 * 60 * 1000).toISOString()),
    }

    this.service.postApi('/api/v1/admin/getHomeBannerList', apireq, 0).subscribe((success: any) => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.categoryArray = success.Data.docs;
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
      serviceId: this.id,
    }

    this.service.postApi("/api/v1/admin/deleteMainService", deleteData, 0).subscribe((data: any) => {
      if (data.response_code == 200) {
        this.service.succ(data.response_message);
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

  selectImages(event) {
    var urls = [];
    var file = event.target.files;
    if (file) {
      for (let files of file) {
        this.uploadFile.push(files)
        let reader = new FileReader();
        reader.onload = (e: any) => {
          urls.push(e.target.result);
          var urlsLength = urls.length
          if (urlsLength == file.length) {
            this.image = urls[0]
          }
        }
        reader.readAsDataURL(files);
      }
    }
  }

  editCategory(x) {

     this.id = x._id,
      this.image=x.image
      this.editCateoryForm.patchValue(x)
  }

  editCategoryApi() {

    this.formvalidation.submitted = true
    if (this.editCateoryForm.invalid) {
      return
    }
    this.spinner.show();
    $('#editCategory').modal('hide')

    let formData = new FormData()
    formData.append("bannerId", this.id)
    if(this.uploadFile.length>0){
      formData.append(`image`, this.uploadFile[0])

    }


    this.service.formdataApi('/api/v1/admin/updateHomeBanner', formData).subscribe(success => {
      if (success.body.response_code == 200) {
        this.spinner.hide();
        this.getViewData()
        this.editCateoryForm.reset();
        this.addCategoryForm.reset();
        $("#editCategory").modal('hide')
        this.formvalidation.submitted = false
        this.service.succ(success.body.response_message)
        this.fileUploader1.nativeElement.value = null;
        this.formdata.delete("bannerId")
        this.image = ''
        
      } else if (success.body.response_code == 501) {
        this.spinner.hide();
        this.editCateoryForm.reset();
        this.addCategoryForm.reset();
        this.fileUploader1.nativeElement.value = null;
        this.formdata.delete("bannerId")
        this.image = ''
        this.service.err(success.body.response_message)
      }
      else {
        this.spinner.hide();
        this.editCateoryForm.reset();
        this.addCategoryForm.reset();
        this.fileUploader1.nativeElement.value = null;
        this.formdata.delete("bannerId")
        this.image = ''
        this.service.err("Something went wrong")
      }
    }, error => {
      this.spinner.hide();
      this.service.err("Something went wrong")
    })
  }

  reset() {
    this.formvalidation.submitted = false
    this.addCategoryForm.reset()
    this.editCateoryForm.reset()
  }

  backClicked() {
    this._location.back();
  }


}
