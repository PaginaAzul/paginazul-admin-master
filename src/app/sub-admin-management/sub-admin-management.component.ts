import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $;

@Component({
  selector: 'app-sub-admin-management',
  templateUrl: './sub-admin-management.component.html',
  styleUrls: ['./sub-admin-management.component.css']
})
export class SubAdminManagementComponent implements OnInit {

  searchForm: any;
  temp: any = {};
  items: any = [];
  pageNumber: number = 1;
  limit: number = 10;
  srNo: any;
  pageData: any;
  id: any;
  search: any;
  total: any;
  params: any;
  addSubAdminForm: any;
  editSubAdminForm: any;
  categoryName: any;
  username: any;
  name: any;
  email: any;
  country: any;
  password: any;
  categories: { id: number; name: string; }[];
  categoriesSelected: boolean[];
  dropDownData1: any = [];
  marked: boolean;
  theCheckbox: boolean;
  nowDate2: any;
  todayDate: Date;
  userManagement: any;
  orderManagement: any;
  ratingManagement: any;
  staticManagement: any;
  bankManagement: any;
  settingManagement: any;
  mailForm: any;
  show: boolean;

  constructor(
    private serviceCaller: AppService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public spinner: NgxSpinnerService
  ) {this.show=false }

  ngOnInit() {
    this.password1()
    this.formValidation();
    this.getList();
    window.scrollTo(0, 0);
    this.todayDate = new Date()

    this.addSubAdminForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(254), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)])),
      country: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      userManagement: new FormControl(false),
      orderManagement: new FormControl(false),
      ratingManagement: new FormControl(false),
      staticManagement: new FormControl(false),
      bankManagement: new FormControl(false),
      settingManagement: new FormControl(false),
      selectAll: new FormControl(false),

    })

    this.dropDownData1 = ['India', 'Saudi']
    this.marked = false;
    this.theCheckbox = false;

    this.editSubAdminForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      userManagement: new FormControl(false),
      orderManagement: new FormControl(false),
      ratingManagement: new FormControl(false),
      staticManagement: new FormControl(false),
      bankManagement: new FormControl(false),
      settingManagement: new FormControl(false),

    })

    this.mailForm = new FormGroup({
      message: new FormControl('', [Validators.required]),
    
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

  getList() {

    this.temp.search = "";
    this.temp.limit = this.limit;
    this.temp.pageNumber = this.pageNumber;

    this.spinner.show();
    this.serviceCaller.postApi("/api/v1/admin/getSubAdmin", this.temp, 0).subscribe((data: any) => {
      if (data.response_code == 200) {
        this.spinner.hide();
        this.items = data.Data.docs;
        this.pageData = data.Data;
        this.srNo = (this.pageNumber - 1) * 10
      }
      else{
        this.serviceCaller.err("Something went wrong");
      }
    })
  }

  pagination($event) {
    this.pageNumber = $event;
    this.getList();
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
      "limit": 10,
      "pageNumber": this.pageNumber,
      "search": data.search,
      "startDate": (data.startDate == '' || data.startDate == undefined) ? '' : (new Date(data.startDate).toISOString()),
      "endDate": (data.endDate == '' || data.endDate == undefined) ? '' : (new Date(new Date(data.endDate).getTime() + 24 * 60 * 60 * 1000).toISOString()),
    }

    this.serviceCaller.postApi('/api/v1/admin/getSubAdmin', apireq, 1).subscribe((success: any) => {
      if (success.response_code == 200) {
        this.items = success.Data.docs;
        this.limit = success.Data.limit;
        this.total = success.Data.total;
        this.pageData = data.Data;

      }
      else {
        this.serviceCaller.err("Something went wrong")
      }
    }, error => {
        this.serviceCaller.err("Something went wrong")
    })
  }




  subAdminDetail(detail) {

    this.router.navigate(['../../admin/subAdminDetails/' + detail._id]);
  }

  delete(id) {
    this.id = id;
  }

  deleteApi() {

    let deleteData = {
      "subAdminId": this.id,
    }

    this.spinner.show();
    this.serviceCaller.postApi("/api/v1/admin/deleteSubAdmin", deleteData, 0).subscribe((data: any) => {
      if (data.response_code == 200) {
        this.spinner.hide();
        this.getList();
        this.serviceCaller.succ(data.response_message);

      } else {
        this.spinner.hide();
        this.serviceCaller.err("Something went wrong");
      }
    })
  }

  addSubAdmin(data) {


    this.spinner.show();
    if (this.addSubAdminForm.invalid) {
      this.spinner.hide();
      return
    }
    $('#add_sub_admin_modal').modal('hide')

    let apireq = {
      username: data.username,
      name: data.name,
      email: data.email,
      country: data.country,
      password: data.password,
      "permission": [{
        userManagement: data.userManagement,
        orderManagement: data.orderManagement,
        ratingManagement: data.ratingManagement,
        staticManagement: data.staticManagement,
        bankManagement: data.bankManagement,
        settingManagement: data.settingManagement,
      }]

    }
    this.serviceCaller.postApi('/api/v1/admin/addSubAdmin', apireq, 0).subscribe(success => {

      if (success.response_code == 200) {
        this.serviceCaller.succ(data.response_message);
        this.spinner.hide();
        this.getList();
        this.addSubAdminForm.reset();
      }
      else if (success.response_code == 501) {
        this.spinner.hide();
        this.serviceCaller.succ(data.response_message);
      }
      else {
        this.spinner.hide();
        this.serviceCaller.err("something went wrong")
      }
    }, error => {
      this.spinner.hide();
      this.serviceCaller.err("something went wrong")
    })
  }


  edit_sub_admin_modal(x) {

    this.id = x._id;
    this.username = x.username
    this.name = x.name
    this.email = x.email
    this.country = x.country
    this.password = x.password
    this.userManagement= x.permission[0].userManagement,
    this.orderManagement= x.permission[0].orderManagement,
    this.ratingManagement= x.permission[0].ratingManagement,
    this.staticManagement= x.permission[0].staticManagement,
    this.bankManagement= x.permission[0].bankManagement,
    this.settingManagement= x.permission[0].settingManagement,

    this.editSubAdminForm.patchValue({
      username: x.username,
      name: x.name,
      email: x.email,
      country: x.country,
      password: x.password,
      userManagement: x.permission[0].userManagement,
      orderManagement: x.permission[0].orderManagement,
      ratingManagement: x.permission[0].ratingManagement,
      staticManagement: x.permission[0].staticManagement,
      bankManagement: x.permission[0].bankManagement,
      settingManagement: x.permission[0].settingManagement,
      

    });

  }

  editSubAdmin(data) {

    this.spinner.show();
    if (this.editSubAdminForm.invalid) {
      this.spinner.hide();
      return
    }
    $('#edit_sub_admin_modal').modal('hide')

    let apireq = {
      username: data.username,
      name: data.name,
      email: data.email,
      country: data.country,
      passwor: data.password,
      subAdminId: this.id,
      "permission": [{
        userManagement: data.userManagement,
        orderManagement: data.orderManagement,
        ratingManagement: data.ratingManagement,
        staticManagement: data.staticManagement,
        bankManagement: data.bankManagement,
        settingManagement: data.settingManagement,
      }]
    }


    this.serviceCaller.postApi('/api/v1/admin/updateSubAdminDetails', apireq, 0).subscribe(success => {

      if (success.response_code == 200) {
        this.spinner.hide();
        this.serviceCaller.succ(success.response_message);
        this.getList();
      }
      else if (success.response_code == 501) {
        this.spinner.hide();
      this.serviceCaller.err("something went wrong")
      }
      else {
         this.spinner.hide();
      this.serviceCaller.err("something went wrong")
      }
    }, error => {
      this.spinner.hide();
      this.serviceCaller.err("something went wrong")
    })
  }

  validateCheckbox(dataaa) {

    if (dataaa == false) {
      this.addSubAdminForm.patchValue({
        selectAll: false,
      });
    }
  }

  checkAll(value) {

    if (value == true) {
      this.addSubAdminForm.patchValue({
        userManagement: true,
        orderManagement: true,
        ratingManagement: true,
        staticManagement: true,
        bankManagement: true,
        settingManagement: true,
      });
    }
    else {
      this.addSubAdminForm.patchValue({
        userManagement: false,
        orderManagement: false,
        ratingManagement: false,
        staticManagement: false,
        bankManagement: false,
        settingManagement: false,
      });
    }

  }

  reset() {
    this.editSubAdminForm.reset() 
    this.mailForm.controls['message'].setValue(null)
    this.addSubAdminForm.reset()
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
    this.serviceCaller.postApi('/api/v1/admin/sendMailToSubAdmin', apireq, 0).subscribe(success => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.serviceCaller.succ(success.response_message);
        this.mailForm.reset();
      } else {
        this.spinner.hide();
        this.serviceCaller.err("Something went wrong")
      }
    },error=>{
      this.spinner.hide();
      this.serviceCaller.err("Something went wrong")
    })
  }

  password1() {
    this.show = !this.show;
}


}
