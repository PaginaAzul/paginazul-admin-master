import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute, Data } from '@angular/router';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  id: any;
  temp:any = {};
  postID:any = {};
  item:any = {};
  statusForm: any;
  dropDownData: any = []
  pdfdata: any;

  constructor(
    private serviceCaller : AppService,
    private activatedRoute: ActivatedRoute,
    public router: Router
    
  ) {
    this.postID = activatedRoute.snapshot.url[1].path;
   }

  ngOnInit() {
    this.getId()
    this.getDetail()
    this.dropDownData = ['Pending', 'Active', 'Complete', 'Cancel']
  }
  getId(){
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;

    });
  }
  
   getDetail(){
    let apireq={
      orderId : this.id
    }
    this.serviceCaller.postApi('/api/v1/admin/orderDetails',apireq,1).subscribe((data:any)=>{
      if(data.response_code==200){
        this.item = data.Data;
      }
      else{
        console.log(data.response_message)
      }
    },error=>{
      console.log("Something went wrong")
    })
  }


  updateStatus() {
    if (this.statusForm.invalid) {
      return;
    }
    let apireq = {
      "orderId": this.id,
      "orderStatus": this.statusForm.value.updatedStatus
    }
    this.serviceCaller.postApi("/api/v1/admin/orderStatusChange", apireq, 1).subscribe(success => {
      if (success.body.response_code == 200) {
      }
    }, error => {
      this.serviceCaller.error("Something went wrong")
    })
  }




    createPdf() {
      let apireq = {
        "orderId": this.id,
      }
      this.serviceCaller.postApi("/api/v1/admin/createPdf", apireq, 1).subscribe(success => {
        if (success.response_code == 200) {
          this.serviceCaller.succ(success.response_message)
          this.router.navigate(['/admin/postManagement/']);
          this.getDetail()
          this.pdfdata=success.Data
        }
      }, error => {
        this.serviceCaller.error("Something went wrong")
      })
    }

}

