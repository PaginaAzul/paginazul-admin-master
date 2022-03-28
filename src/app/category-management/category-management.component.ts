import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { nearer, delay } from 'q';
import { NgxSpinnerService } from 'ngx-spinner';


declare var $;

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {

  @ViewChild('fileUploader') fileUploader: ElementRef;
  @ViewChild('fileUploader1') fileUploader1: ElementRef;
  @ViewChild('fileUploader2') fileUploader2: ElementRef;
  formdata = new FormData
  searchForm: any;
  temp: any = {};
  items: any = [];
  pageNumber: number = 1;
  limit: number = 30;
  srNo: any;
  pageData: any;
  id: any;
  search: any;
  total: any;
  params: any;
  addCategoryForm: any;
  addSubCategoryForm: any;
  editCategoryForm: any;
  categoryName: any;
  nowDate2: any;
  todayDate: Date;
  uploadFile: any = []
  image: any;
  portugueseCategoryName: any;
  categoryId: any;



  constructor(
    private serviceCaller: AppService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.formValidation();
    this.getList();
    window.scrollTo(0, 0);
    this.todayDate = new Date()

    this.addCategoryForm = new FormGroup({
      categoryName: new FormControl('', [Validators.required]),
      portugueseCategoryName: new FormControl('', [Validators.required]),
    })

    this.addSubCategoryForm = new FormGroup({
      subCategoryName: new FormControl('', [Validators.required]),
      portugueseSubCategoryName: new FormControl('', [Validators.required]),
    })

    this.editCategoryForm = new FormGroup({
      categoryName: new FormControl('', [Validators.required]),
      portugueseCategoryName: new FormControl('', [Validators.required]),

    })

  }

  getId() {
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;
    });
  }


  formValidation() {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl('')

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

  fromMaxDate(event) {
    if (event) {
      this.todayDate = new Date(event)
    } else {
      this.todayDate = new Date()
    }
  }

  searchFilter(data) {

    let apireq = {
      "limit": this.limit,
      "pageNumber": this.pageNumber,
      "search": data.search,
      "startDate": (data.startDate == '' || data.startDate == undefined) ? '' : (new Date(data.startDate).toISOString()),
      "endDate": (data.endDate == '' || data.endDate == undefined) ? '' : (new Date(new Date(data.endDate).getTime() + 24 * 60 * 60 * 1000).toISOString()),
    }

    this.serviceCaller.postApi('/api/v1/admin/getCategory', apireq, 1).subscribe((success: any) => {
      if (success.response_code == 200) {
        this.items = success.Data.docs;
        this.pageData = success.data;
        this.limit = success.Data.limit;
        this.total = success.Data.total;
        this.srNo = (this.pageNumber - 1) * this.limit

      }
      else {
        this.serviceCaller.err("Something went wrong")
      }
    }, error => {
      this.serviceCaller.err("Something went wrong")
    })
  }

  getList() {

    this.temp.search = "";
    this.temp.limit = this.limit;
    this.temp.pageNumber = this.pageNumber;

    this.spinner.show();
    this.serviceCaller.postApi("/api/v1/admin/getCategory", this.temp, 0).subscribe((data: any) => {
      if (data.response_code == 200) {
        this.spinner.hide();
        this.items = data.Data.docs;
        this.pageData = data.data;
        this.limit = data.Data.limit;
        this.total = data.Data.total;
        this.srNo = (this.pageNumber - 1) * this.limit

      }
      else {
        this.spinner.hide();
        this.serviceCaller.err("Something went wrong")
      }
    })
  }

  pagination($event) {
    this.pageNumber = $event;
    this.getList();
  }


  delete(id) {
    this.id = id;
  }

  categoryDetail(x) {
    this.router.navigate(['../../admin/categoryDetails/' + x]);
  }

  deleteApi() {

    let deleteData = {
      "categoryId": this.id,
      adminId: localStorage.getItem('_id')
    }


    this.serviceCaller.postApi("/api/v1/admin/deleteCategory", deleteData, 0).subscribe((data: any) => {
      if (data.response_code == 200) {
        this.getList();
        this.serviceCaller.succ(data.response_message);
      } 
      else if (data.response_code == 501) {
        this.getList();
        this.serviceCaller.err(data.response_message);
      } 
      else {
        this.serviceCaller.err("Something went wrong");
      }

    });
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

  addCategory1() {

    this.serviceCaller.showSpinner()
    if (this.addCategoryForm.invalid) {
      return
    }
    if (this.uploadFile.length == 0) {
      this.serviceCaller.hideSpinner()
      this.serviceCaller.err("Image is mandatory");
      return
    }

    let formData = new FormData()
    formData.append("adminId", localStorage.getItem('_id'))
    formData.append("categoryName", this.addCategoryForm.value.categoryName)
    formData.append("portugueseCategoryName", this.addCategoryForm.value.portugueseCategoryName)
    formData.append(`categoryImage`, this.uploadFile[0])
    this.serviceCaller.formdataApi("/api/v1/admin/addServiceCat", formData).subscribe((result: any) => {
      if (result.body.response_code == 200) {
        this.fileUploader.nativeElement.value = null;
        this.serviceCaller.hideSpinner()
        $('#add_category_modal').modal('hide')
        this.image = ''
        this.formdata.delete("adminId")
        this.formdata.delete("categoryName")
        this.uploadFile = []
        this.serviceCaller.succ(result.body.response_message);
        this.getList();
        this.addCategoryForm.reset();
      }
      else {
        this.fileUploader.nativeElement.value = null;
        this.image = ''
        this.formdata.delete("adminId")
        this.formdata.delete("categoryName")
        this.uploadFile = []
        this.serviceCaller.hideSpinner()
        this.serviceCaller.err("Something went wrong");
      }
    }, error => {
      this.fileUploader.nativeElement.value = null;
      this.image = ''
      this.uploadFile = []
      this.formdata.delete("adminId")
      this.formdata.delete("categoryName")
      this.serviceCaller.hideSpinner()
      this.serviceCaller.err("Something went wrong");
    })
  }


  add_sub_category_modal(id) {
    this.id = id;
  }

  addSubCategory1() {

    this.serviceCaller.showSpinner()
    if (this.addSubCategoryForm.invalid) {
      this.serviceCaller.hideSpinner()
      return
    }
    if (this.uploadFile.length == 0) {
      this.serviceCaller.hideSpinner()
      this.serviceCaller.err("Image is mandatory");
      return
    }
    $('#add_sub_category_modal').modal('hide')
    let formData = new FormData()
    formData.append("adminId", localStorage.getItem('_id'))
    formData.append("subCategoryName", this.addSubCategoryForm.value.subCategoryName)
    formData.append("portugueseSubCategoryName", this.addSubCategoryForm.value.portugueseSubCategoryName)
    formData.append("categoryId", this.id)
    formData.append(`subCategoryImage`, this.uploadFile[0])
    this.serviceCaller.formdataApi("/api/v1/admin/addServiceSubCat", formData).subscribe((result: any) => {
      if (result.body.response_code == 200) {
        this.fileUploader2.nativeElement.value = null;
        this.serviceCaller.hideSpinner()
        $('#edit_category_modal').modal('hide')
        this.image = ''
        this.formdata.delete("adminId")
        this.formdata.delete("subCategoryName")
        this.formdata.delete("categoryId")
        this.uploadFile = []
        this.serviceCaller.succ(result.body.response_message);
        this.getList();
        this.addSubCategoryForm.reset();
      }
      else {
        this.fileUploader2.nativeElement.value = null;
        this.image = ''
        this.formdata.delete("adminId")
        this.formdata.delete("categoryId")
        this.formdata.delete("subCategoryName")
        this.uploadFile = []
        this.serviceCaller.hideSpinner()
        this.serviceCaller.err("Something went wrong");
      }
    }, error => {
      this.fileUploader2.nativeElement.value = null;
      this.image = ''
      this.uploadFile = []
      this.formdata.delete("adminId")
      this.formdata.delete("categoryId")
      this.formdata.delete("subCategoryName")
      this.serviceCaller.hideSpinner()
      this.serviceCaller.err("Something went wrong");
    })

  }



  edit_category_modal(x) {


    this.id = x._id;
    this.categoryName = x.categoryName
    this.portugueseCategoryName = x.portugueseCategoryName
    this.image = x.categoryImage
    this.editCategoryForm.patchValue({
      categoryName: x.categoryName,
      portugueseCategoryName: x.portugueseCategoryName
    });
  }

  editCategory1() {

    this.serviceCaller.showSpinner()
    if (this.editCategoryForm.invalid) {
      this.serviceCaller.hideSpinner()
      return
    }
    $('#edit_category_modal').modal('hide')
    let formData = new FormData()
    formData.append("adminId", localStorage.getItem('_id'))
    formData.append("categoryId", this.id)
    formData.append("categoryName", this.editCategoryForm.value.categoryName)
    formData.append("portugueseCategoryName", this.editCategoryForm.value.portugueseCategoryName)
    formData.append(`categoryImage`, this.uploadFile[0])
    this.serviceCaller.formdataApi("/api/v1/admin/updateCategory", formData).subscribe((result: any) => {
      if (result.body.response_code == 200) {
        this.fileUploader1.nativeElement.value = null;
        this.serviceCaller.hideSpinner()
        $('#edit_category_modal').modal('hide')
        this.image = ''
        this.formdata.delete("adminId")
        this.formdata.delete("categoryName")
        this.uploadFile = []
        this.serviceCaller.succ(result.body.response_message);
        this.getList();
        this.addCategoryForm.reset();
      }
      else if (result.body.response_code == 501) {
        this.fileUploader1.nativeElement.value = null;
        this.serviceCaller.hideSpinner()
        $('#edit_category_modal').modal('hide')
        this.image = ''
        this.formdata.delete("adminId")
        this.formdata.delete("categoryName")
        this.uploadFile = []
        this.serviceCaller.err(result.body.response_message);
        this.getList();
        this.addCategoryForm.reset();
      }
      else {
        this.fileUploader1.nativeElement.value = null;
        this.image = ''
        this.formdata.delete("adminId")
        this.formdata.delete("categoryName")
        this.uploadFile = []
        this.serviceCaller.hideSpinner()
        this.serviceCaller.err("Something went wrong");
      }
    }, error => {
      this.fileUploader1.nativeElement.value = null;
      this.image = ''
      this.uploadFile = []
      this.formdata.delete("adminId")
      this.formdata.delete("categoryName")
      this.serviceCaller.hideSpinner()
      this.serviceCaller.err("Something went wrong");
    })
  }

  reset() {
    this.addCategoryForm.reset()
    this.editCategoryForm.reset()
    this.addSubCategoryForm.reset()
  }

  blockApi(status, modal) {

    let apireq = {
      "categoryId": this.categoryId,
      "status": status,
    }

    this.spinner.show();
    this.serviceCaller.postApi('/api/v1/admin/updateCategoryStatus', apireq, 1).subscribe((success: any) => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.getList()
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

  openModal(id, userId) {
    this.categoryId = userId
    $('#' + id).modal({ backdrop: 'static', keyboard: false });
  }
}
