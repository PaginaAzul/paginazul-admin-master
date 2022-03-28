import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
declare var $: any


@Component({
  selector: 'app-offer-banner',
  templateUrl: './offer-banner.component.html',
  styleUrls: ['./offer-banner.component.css']
})
export class OfferBannerComponent implements OnInit {

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
  addCategoryForm: FormGroup;

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

    this.editCateoryForm = new FormGroup({
      resAndStoreId: new FormControl('', [Validators.required]),

    })
    this.addCategoryForm = new FormGroup({
      resAndStoreId: new FormControl('', [Validators.required]),
      
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

  getViewData() {

    let apireq = {
      "limit": this.limit,
      "pageNumber": this.pageNumber,
      "search": "",
    }

    this.spinner.show();
    this.service.postApi('/api/v1/admin/getBannerOfferList', apireq, 0).subscribe((success: any) => {
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
      "offerId": this.userId,
      "status": status,
    }

    this.spinner.show();
    this.service.postApi('/api/v1/admin/updateStatusBannerOffer', apireq, 0).subscribe((success: any) => {
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

    this.service.postApi('/api/v1/admin/getBannerOfferList', apireq, 0).subscribe((success: any) => {
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
      offerId: this.id,
    }

    this.service.postApi("/api/v1/admin/deleteBannerOffer", deleteData, 0).subscribe((data: any) => {
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

  addCategoryApi() {

    this.formvalidation.submitted = true
    if (this.addCategoryForm.invalid) {
      return
    }
    if(this.uploadFile.length==0){
      this.service.err("Image is required")
      return
    }
    this.spinner.show();
    $('#add_category_modal').modal('hide')
    if (this.uploadFile.length == 0) {
      this.serviceCaller.hideSpinner()
      this.serviceCaller.err("Image is mandatory");
      return
    }

    let formData = new FormData()
    formData.append("resAndStoreId", this.addCategoryForm.value.resAndStoreId)
    formData.append(`image`, this.uploadFile[0])
  

    this.service.formdataApi('/api/v1/admin/addBannerOffer', formData).subscribe(success => {
      if (success.body.response_code == 200) {
        this.spinner.hide();
        this.addCategoryForm.reset();
        $("#add_category_modal").modal('hide')
        this.formvalidation.submitted = false
        this.getViewData()
        this.service.succ(success.body.response_message)
        this.fileUploader.nativeElement.value = null;
        this.image = ''
      } 
     
      else {
        this.spinner.hide();
        this.editCateoryForm.reset();
        this.addCategoryForm.reset();
        this.fileUploader.nativeElement.value = null;
        this.image = ''
        this.service.err("Something went wrong")
      }
    }, error => {
      this.spinner.hide();
      this.fileUploader.nativeElement.value = null;
      this.image = ''
      this.service.err("Something went wrong")
    })
  }


  editCategory(x) {

      this.id = x._id,
      this.image=x.image
      this.resAndStoreId=x.resAndStoreId
      this.editCateoryForm.patchValue(x)
      this.editCateoryForm.get('resAndStoreId').setValue(this.resAndStoreId);
  }

  editCategoryApi() {

   
    this.formvalidation.submitted = true
    if (this.editCateoryForm.invalid) {
      return
    }
    this.spinner.show();
    $('#editCategory').modal('hide')

    let formData = new FormData()
    formData.append("offerId", this.id)
    formData.append("resAndStoreId", this.editCateoryForm.value.resAndStoreId)
    if(this.uploadFile.length>0){
      formData.append(`image`, this.uploadFile[0])

    }


    this.service.formdataApi('/api/v1/admin/updateBannerOffer', formData).subscribe(success => {
      if (success.body.response_code == 200) {
        this.spinner.hide();
        this.getViewData()
        this.editCateoryForm.reset();
        this.addCategoryForm.reset();
        $("#editCategory").modal('hide')
        this.formvalidation.submitted = false
        this.service.succ(success.body.response_message)
        this.fileUploader1.nativeElement.value = null;
        this.uploadFile=[]
        this.formdata.delete("offerId")
        this.formdata.delete("resAndStoreId")
        this.image = ''
        
      } else if (success.body.response_code == 501) {
        this.spinner.hide();
        this.editCateoryForm.reset();
        this.addCategoryForm.reset();
        this.fileUploader1.nativeElement.value = null;
        this.formdata.delete("offerId")
        this.uploadFile=[]
        this.formdata.delete("resAndStoreId")
        this.image = ''
        this.service.err(success.body.response_message)
      }
      else {
        this.spinner.hide();
        this.editCateoryForm.reset();
        this.addCategoryForm.reset();
        this.fileUploader1.nativeElement.value = null;
        this.formdata.delete("offerId")
        this.uploadFile=[]
        this.formdata.delete("resAndStoreId")
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
