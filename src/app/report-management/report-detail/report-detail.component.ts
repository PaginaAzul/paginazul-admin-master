import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute } from '@angular/router';
declare var $;
@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {
  reportID: string;
  temp: any = {};
  item: any = {};
  id: any;

  constructor(
    private serviceCaller : AppService,
    private activatedRoute: ActivatedRoute,

  ) { 
    this.reportID = activatedRoute.snapshot.url[1].path;
  }

 
   ngOnInit() {
    this.getId()
    this.getDetail()
  }
  getId(){
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;
      console.log(this.id);
    });
  }
  
   getDetail(){
    let apireq={
      contactId : this.id
    }
    this.serviceCaller.postApi('/api/v1/admin/contactDetails',apireq,1).subscribe((data:any)=>{
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

  deleteApi(status){
    let apireq={
      contactId : this.id
    }
    this.serviceCaller.postApi('/api/v1/admin/contactDelete',apireq,1).subscribe(success=>{
      if(success.response_code==200){
        this.getDetail();
        $('#delete').modal('hide')
        this.serviceCaller.succ(success.response_message)
      }
      else{
        this.serviceCaller.err(success.response_message)
      }
    },error=>{
      this.serviceCaller.err("Something went wrong")
    })
  }

}
