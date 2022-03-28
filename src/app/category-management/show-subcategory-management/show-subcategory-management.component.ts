import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $;

@Component({
  selector: 'app-show-subcategory-management',
  templateUrl: './show-subcategory-management.component.html',
  styleUrls: ['./show-subcategory-management.component.css']
})
export class ShowSubcategoryManagementComponent implements OnInit {

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
  addSubSubCategoryForm: any;
  addSubCategoryForm: any;
  editSubSubCategoryForm:any;
  subSubCategoryName: any;
  nowDate2: any;
  todayDate: Date;


  constructor(
    private serviceCaller : AppService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {  this.getId()}

  ngOnInit() {
    this.formValidation();
    this.getList();
    window.scrollTo(0, 0);
    this.todayDate = new Date()
    this.addSubSubCategoryForm = new FormGroup({
      subSubCategoryName: new FormControl('',[Validators.required]),
     
    })

    this.editSubSubCategoryForm = new FormGroup({
      subSubCategoryName: new FormControl('',[Validators.required]),
     
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

  searchFilter(data){

    let apireq={        
      "limit" : 10,  
      "pageNumber" : this.pageNumber,
      "search" : data.search,
      "startDate": (data.startDate == '' || data.startDate == undefined) ? '' : (new Date(data.startDate).toISOString()),
      "endDate": (data.endDate == '' || data.endDate == undefined) ? '' : (new Date(new Date(data.endDate).getTime() + 24 * 60 * 60 * 1000).toISOString()),
    }

    this.serviceCaller.postApi('/api/v1/admin/getSubSubCategory',apireq,1).subscribe((success:any)=>{
      if(success.response_code==200){
        this.items = success.Data.docs;
        this.limit = success.Data.limit;
        this.total = success.Data.total;
      
      }
      else{
        this.serviceCaller.err(success.response_message)
      }
    },error=>{
      this.serviceCaller.err("Something went wrong")
    })
  }

  getId(){
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;
    });
  }
  getList() {
    this.temp.search = "";
    this.temp.limit = this.limit;
    this.temp.pageNumber = this.pageNumber;
    this.temp.subCategoryId=this.id
    this.serviceCaller.postApi("/api/v1/admin/getSubSubCategory", this.temp, 0).subscribe((data:any) => {
        if(data.response_code==200){
          this.items = data.Data.docs;
          this.pageData = data.data;
          this.srNo = (this.pageNumber - 1) * 10
        }
        else{
          this.serviceCaller.err(data.response_message);
        }
     
      
      
    });
  }

  pagination($event){
    this.pageNumber = $event;
    this.getList();
  }


  delete(id) {
    this.id = id;
  }

  categoryDetail(detail) {
    this.router.navigate(['../../admin/categoryDetails/'+detail._id]);
  }

  deleteApi() {

    let deleteData = {
      "subSubCategoryId" : this.id,
      adminId:localStorage.getItem('_id')
    }

    this.serviceCaller.postApi("/api/v1/admin/deleteSubSubCategory", deleteData, 0).subscribe((data:any) => {
      if(data.response_code == 200) {
        this.serviceCaller.succ(data.response_message);
        this.router.navigate(['../../admin/categoryDetails/']);
      } else {
        this.serviceCaller.err(data.response_message);
      }
      this.getList();
    });
  }


  edit_sub_sub_category_modal(x){
    this.id =x._id;
    this.subSubCategoryName=x.subSubCategoryName
    this.editSubSubCategoryForm.patchValue({
      subSubCategoryName: x.subSubCategoryName 
    });
  }

  editSubSubCategory1(data) {
  
    if (this.editSubSubCategoryForm.invalid) {
      return
    }
    $('#edit_sub_sub_category_modal').modal('hide')
   
    let apireq = {
      subSubCategoryName: data.subSubCategoryName,
      subSubCategoryId: this.id,
      adminId:localStorage.getItem('_id')
    }

    this.serviceCaller.postApi('/api/v1/admin/updateSubSubCategory', apireq, 0).subscribe(success => {
      if (success.response_code == 200) {
        this.serviceCaller.succ(success.response_message);
        this.getList();
      } else {
        this.serviceCaller.err(success.response_message);
        
      }
    }, error => {
      this.serviceCaller.err("Something went wrong");
      
    })
  }

  reset(){
    this.addSubSubCategoryForm.reset()
    this.editSubSubCategoryForm.reset()
  }

}
