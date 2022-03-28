import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $;

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css']
})
export class ShowCategoryComponent implements OnInit {

  @ViewChild('fileUploader') fileUploader: ElementRef;


  searchForm: any;
  temp: any = {};
  items: any =[];
  pageNumber:number = 1;
  limit:number=30;
  srNo:any;
  pageData:any;
  id: any;
  search: any;
  total:any;
  params:any;
  addSubSubCategoryForm: any;
  addSubCategoryForm: any;
  editSubCategoryForm:any;
  subCategoryName: any;
  nowDate2: any;
  todayDate: Date;
  categoryId:any;
  uploadFile: any = []
  image: any;
  formdata = new FormData
  portugueseSubCategoryName: any;
  subCategoryId: any;



  constructor(
    private serviceCaller : AppService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.getId()
   }

  ngOnInit() {
    this.formValidation();
    this.getList();
    window.scrollTo(0, 0);
    this.todayDate = new Date()
    this.addSubSubCategoryForm = new FormGroup({
      subSubCategoryName: new FormControl('',[Validators.required]),
     
    })
    this.editSubCategoryForm = new FormGroup({
      subCategoryName: new FormControl('',[Validators.required]),
      portugueseSubCategoryName: new FormControl('', [Validators.required]),
     
    })
  }
   
 


  formValidation(){
    this.searchForm = new FormGroup({
      search : new FormControl('',),
      startDate : new FormControl('',),
      endDate : new FormControl('',)
    
    })
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

  searchFilter(data){

    let apireq={        
      "limit" : this.limit,  
      categoryId :this.categoryId,
      "pageNumber" : this.pageNumber,
      "search" : data.search,
      "startDate": (data.startDate == '' || data.startDate == undefined) ? '' : (new Date(data.startDate).toISOString()),
      "endDate": (data.endDate == '' || data.endDate == undefined) ? '' : (new Date(new Date(data.endDate).getTime() + 24 * 60 * 60 * 1000).toISOString()),
    }

    this.serviceCaller.postApi('/api/v1/admin/getSubSubCategory',apireq,1).subscribe((success:any)=>{
      if(success.response_code==200){
        this.spinner.hide();
        this.items = data.Data.docs;
        this.pageData = data.data;
        this.srNo = (this.pageNumber - 1) * this.limit
      
      }
      else{
        this.serviceCaller.err("Something went wrong")
      }
    },error=>{
      this.serviceCaller.err("Something went wrong")
    })
  }

  categoryDetail(x) {
    this.categoryId=x;
    this.router.navigate(['../../admin/categoryDetails',x]);
  }

  getId(){
    this.activatedRoute.params.subscribe(paramsId => {
      this.categoryId = paramsId.id;
    });
  }

  getList() {

    this.temp.search = "";
    this.temp.limit = this.limit;
    this.temp.pageNumber = this.pageNumber;
    this.temp.categoryId=this.categoryId

    this.spinner.show();
    this.serviceCaller.postApi("/api/v1/admin/getSubCategory",this.temp, 0).subscribe((data:any) => {
      if(data.response_code==200){
        this.spinner.hide();
        this.items = data.Data.docs;
        this.pageData = data.data;
        this.srNo = (this.pageNumber - 1) * this.limit
      
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
      "subCategoryId" : this.id,
      adminId:localStorage.getItem('_id')
    }

    
    this.serviceCaller.postApi("/api/v1/admin/deleteSubCategory", deleteData, 0).subscribe((data:any) => {
      if(data.response_code == 200) {
        this.getList();
        this.spinner.hide();
        this.serviceCaller.succ(data.response_message);
      }
      else  if(data.response_code == 501) {
        this.getList();
        this.spinner.hide();
        this.serviceCaller.err(data.response_message);
      }
       else {
        this.spinner.hide();
        this.serviceCaller.err("Something went wrong")
      }
    })
  }

  subCategoryDetail(x) {
    this.router.navigate(['../../admin/subCategoryDetails/'+x]);
  }

  add_sub_sub_category_modal(id){
    this.id = id;
  }

  addSubSubCategory1(data) {

    this.spinner.show();
    if (this.addSubSubCategoryForm.invalid) {
      this.spinner.hide();
      return
    }
    $('#add_sub_sub_category_modal').modal('hide')
   
    let apireq = {
      subSubCategoryName: data.subSubCategoryName,
      adminId: localStorage.getItem('_id'),
      subCategoryId: this.id
    }

    this.spinner.show();
    this.serviceCaller.postApi('/api/v1/admin/addServiceSubSubCat', apireq, 0).subscribe(success => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.serviceCaller.succ(success.response_message);
        this.getList();
        this.addSubSubCategoryForm.reset();
      } else {
        this.spinner.hide();
        this.serviceCaller.err("Something went wrong")
        }
    }, error => {
      this.spinner.hide();
        this.serviceCaller.err("Something went wrong")
    })
  }


  edit_sub_category_modal(x){
    this.id =x._id;
    this.subCategoryName=x.subCategoryName
    this.portugueseSubCategoryName=x.portugueseSubCategoryName
    this.image=x.image
    this.editSubCategoryForm.patchValue({
      subCategoryName: x.subCategoryName,
      portugueseSubCategoryName: x.portugueseSubCategoryName 
    });
  }

  editSubCategory1(data) {
  
    this.serviceCaller.showSpinner()
    if (this.editSubCategoryForm.invalid) {
      this.serviceCaller.hideSpinner()
      return
    }
    $('#edit_sub_category_modal').modal('hide')


    let formData = new FormData()
    formData.append("adminId", localStorage.getItem('_id'))
    formData.append("subCategoryName", this.editSubCategoryForm.value.subCategoryName)
    formData.append("portugueseSubCategoryName", this.editSubCategoryForm.value.portugueseSubCategoryName)
    formData.append("subCategoryId", this.id)
    formData.append(`subCategoryImage`, this.uploadFile[0])
    this.serviceCaller.formdataApi("/api/v1/admin/updateSubCategory", formData).subscribe((result: any) => {
      if (result.body.response_code == 200) {
        this.fileUploader.nativeElement.value = null;
        this.serviceCaller.hideSpinner()
        $('#edit_sub_category_modal').modal('hide')
        this.image = ''
        this.formdata.delete("adminId")
        this.formdata.delete("subCategoryId")
        this.formdata.delete("subCategoryName")
        this.uploadFile = []
        this.serviceCaller.succ(result.body.response_message);
        this.getList();
        this.editSubCategoryForm.reset();
      }
      else if (result.body.response_code == 501) {
        this.fileUploader.nativeElement.value = null;
        this.serviceCaller.hideSpinner()
        $('#edit_sub_category_modal').modal('hide')
        this.image = ''
        this.formdata.delete("adminId")
        this.formdata.delete("subCategoryId")
        this.formdata.delete("subCategoryName")
        this.uploadFile = []
        this.serviceCaller.err(result.body.response_message);
        this.getList();
        this.editSubCategoryForm.reset();
      }
      else {
        this.fileUploader.nativeElement.value = null;
        this.image = ''
        this.formdata.delete("adminId")
        this.formdata.delete("subCategoryId")
        this.formdata.delete("subCategoryName")
        this.uploadFile = []
        this.serviceCaller.hideSpinner()
        this.serviceCaller.err("Something went wrong");
      }
    }, error => {
      this.fileUploader.nativeElement.value = null;
      this.image = ''
      this.uploadFile = []
      this.formdata.delete("adminId")
      this.formdata.delete("subCategoryId")
      this.formdata.delete("subCategoryName")
      this.serviceCaller.hideSpinner()
      this.serviceCaller.err("Something went wrong");
    })
  
  }

  reset(){
    this.addSubSubCategoryForm.reset()
    this.editSubCategoryForm.reset()
  }

  blockApi(status, modal) {

    let apireq = {
      "subCategoryId": this.subCategoryId,
      "status": status,
    }

    this.spinner.show();
    this.serviceCaller.postApi('/api/v1/admin/updateSubCategoryStatus', apireq, 1).subscribe((success: any) => {
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
    this.subCategoryId = userId
    $('#' + id).modal({ backdrop: 'static', keyboard: false });
  }

}
