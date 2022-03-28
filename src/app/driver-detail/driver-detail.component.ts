import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $;

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.css']
})
export class DriverDetailComponent implements OnInit {

  id: any;
  userDetail: any;
  userId: any;
  imageLength:any
  image:any
  viewImageOnModal: any;
  vehicleImages:any=[]
  

  constructor(
    public router : Router,
    private activatedRoute: ActivatedRoute,
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

  openModal(id,userId){
    this.userId=userId
    $('#'+id).modal({ backdrop: 'static', keyboard: false });
  }

  viewImage(professionalId1) {
    $('#image1').modal({ backdrop: 'static', keyboard: false });
    this.viewImageOnModal = professionalId1
  }
  dismissmodal() {
    $('#image1').modal('hide')
  }


  getUserData(){
    let apireq={
      driverId : this.id
    }
    this.service.postApi('/api/v1/admin/getDriverDetail',apireq,1).subscribe((success)=>{

      if(success.response_code==200){
        this.userDetail = success.Data
        this.image = success.Data.image
        this.imageLength=success.Data.vehicleImages.length
        this.vehicleImages=success.Data.vehicleImages
     
      }
      else{
        console.log(success.response_message)
      }
    },error=>{
      console.log("Something went wrong")
    })
  }



}
