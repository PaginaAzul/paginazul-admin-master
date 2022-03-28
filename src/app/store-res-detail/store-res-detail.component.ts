import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Location } from '@angular/common';
declare var $;

@Component({
  selector: 'app-store-res-detail',
  templateUrl: './store-res-detail.component.html',
  styleUrls: ['./store-res-detail.component.css']
})
export class StoreResDetailComponent implements OnInit {

  id: any;
  userDetail: any;
  image="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAWRXhpZgAATU0AKgAAAAgAAAAAAAD/4QNwaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPg0KCTxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+DQoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9IkJGNzlBRkU3Qjg3Rjk4OEMzNzA0RkI4MDNFRDYwNDYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjMyMjJFN0Y0NUU3MTExRTI5QUE4OEEyRTVCNjE3MkY1IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMyMjJFN0YzNUU3MTExRTI5QUE4OEEyRTVCNjE3MkY1IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgTWFjaW50b3NoIj4NCgkJCTx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyODAxMTc0MDcyMDY4MTFCMzc5RTY0NTg0REM4NUYwIiBzdFJlZjpkb2N1bWVudElEPSJCRjc5QUZFN0I4N0Y5ODhDMzcwNEZCODAzRUQ2MDQ2MyIvPg0KCQk8L3JkZjpEZXNjcmlwdGlvbj4NCgk8L3JkZjpSREY+DQo8L3g6eG1w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"
  userId: any

  constructor(
    public router : Router,
    private activatedRoute: ActivatedRoute,
    private _location: Location,
    public service :AppService
    ) { }

  ngOnInit() {
    this.getId()
    this.getUserData()
  }
 
  getId(){
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;
    });
  }



  getUserData(){
    let apireq={
      resAndStoreId : this.id
    }
    this.service.postApi('/api/v1/admin/getResAndStoreDetail',apireq,0).subscribe((success)=>{

      if(success.response_code==200){
        this.userDetail = success.Data
      }
      else{
        console.log(success.response_message)
      }
    },error=>{
      console.log("Something went wrong")
    })
  }

  backClicked() {
    this._location.back();
  }

}
