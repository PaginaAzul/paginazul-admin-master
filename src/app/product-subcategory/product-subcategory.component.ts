import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
declare var $: any


@Component({
  selector: 'app-product-subcategory',
  templateUrl: './product-subcategory.component.html',
  styleUrls: ['./product-subcategory.component.css']
})
export class ProductSubcategoryComponent implements OnInit {
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
  addCategoryForm: FormGroup;
  categoryId:any
  uploadFile:any=[]
  image:any

  constructor(
    public service: AppService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _location: Location) { }

  ngOnInit() {
    this.getId()
    window.scrollTo(0, 0);
    this.todayDate = new Date()
    this.searchFormVAlue()
    this.getViewData()
    this.editCateoryForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    })

    this.addCategoryForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    })

  }

  getId(){
    this.activatedRoute.params.subscribe(paramsId => {
      this.categoryId = paramsId.id;
    });
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
      categoryId:this.categoryId
    }

    this.spinner.show();
    this.service.postApi('/api/v1/admin/getProductSubCategoryList', apireq, 0).subscribe((success: any) => {
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
      categoryId:this.categoryId,
      "startDate": (data.startDate == '' || data.startDate == undefined) ? '' : (new Date(data.startDate).toISOString()),
      "endDate": (data.endDate == '' || data.endDate == undefined) ? '' : (new Date(new Date(data.endDate).getTime() + 24 * 60 * 60 * 1000).toISOString()),
    }

    this.service.postApi('/api/v1/admin/getProductSubCategoryList', apireq, 0).subscribe((success: any) => {
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
      subcategoryId: this.id,
    }

    this.service.postApi("/api/v1/admin/deleteProductSubCategory", deleteData, 0).subscribe((data: any) => {
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
    this.spinner.show();
    $('#addCategory').modal('hide')

    if (this.uploadFile.length == 0) {
      this.serviceCaller.hideSpinner()
      this.serviceCaller.err("Image is mandatory");
      return
    }

    let formData = new FormData()
    formData.append("name", this.addCategoryForm.value.name)
    formData.append("categoryId", this.categoryId)
    formData.append(`image`, this.uploadFile[0])

   

    this.service.formdataApi('/api/v1/admin/addProductSubCategory', formData).subscribe(success => {
      if (success.body.response_code == 200) {
        this.spinner.hide();
        this.addCategoryForm.reset();
        $("#addCuisine").modal('hide')
        this.formvalidation.submitted = false
        this.getViewData()
        this.fileUploader.nativeElement.value = null;
        this.formdata.delete("name")
        this.formdata.delete("categoryId")
        this.image = ''
        this.service.succ(success.body.response_message)
      } 
      else if (success.body.response_code == 501) {
        this.spinner.hide();
        this.editCateoryForm.reset();
        this.addCategoryForm.reset();
        this.fileUploader.nativeElement.value = null;
        this.formdata.delete("name")
        this.formdata.delete("categoryId")
        this.image = ''
        this.service.err(success.body.response_message)
      }
      else {
        this.spinner.hide();
        this.editCateoryForm.reset();
        this.addCategoryForm.reset();
        this.fileUploader.nativeElement.value = null;
        this.formdata.delete("name")
        this.formdata.delete("categoryId")
        this.image = ''
        this.service.err("Something went wrong")
      }
    }, error => {
      this.spinner.hide();
      this.service.err("Something went wrong")
    })
  }

  editCategory(x) {

     this.id = x._id,
      this.name = x.name,
      this.image = x.image,
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
    formData.append("name", this.editCateoryForm.value.name)
    formData.append("subcategoryId", this.id)
    if(this.uploadFile.length>0){
      formData.append(`image`, this.uploadFile[0])

    }
   

    this.service.formdataApi('/api/v1/admin/updateProductSubCategory',formData).subscribe(success => {
      if (success.body.response_code == 200) {
        this.spinner.hide();
        this.editCateoryForm.reset();
        this.addCategoryForm.reset();
        $("#editCategory").modal('hide')
        this.formvalidation.submitted = false
        this.fileUploader1.nativeElement.value = null;
        this.formdata.delete("name")
        this.formdata.delete("subcategoryId")
        this.image = ''
        this.service.succ(success.body.response_message)
        this.getViewData()
      } else if (success.body.response_code == 501) {
        this.spinner.hide();
        this.fileUploader1.nativeElement.value = null;
        this.formdata.delete("name")
        this.formdata.delete("subcategoryId")
        this.image = ''
        this.editCateoryForm.reset();
        this.addCategoryForm.reset();
        this.service.err(success.body.response_message)
      }
      else {
        this.spinner.hide();
        this.fileUploader1.nativeElement.value = null;
        this.formdata.delete("name")
        this.formdata.delete("subcategoryId")
        this.image = ''
        this.editCateoryForm.reset();
        this.addCategoryForm.reset();
        this.service.err("Something went wrong")
      }
    }, error => {
      this.spinner.hide();
      this.service.err("Something went wrong")
    })
  }

  reset() {
    this.formvalidation.submitted = false
    this.fileUploader1.nativeElement.value = null;
    this.fileUploader.nativeElement.value = null;
    this.image=''
    this.addCategoryForm.reset()
    this.editCateoryForm.reset()
  }

  backClicked() {
    this._location.back();
  }


}
