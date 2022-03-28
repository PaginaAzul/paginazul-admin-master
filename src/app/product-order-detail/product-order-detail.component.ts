import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-product-order-detail',
  templateUrl: './product-order-detail.component.html',
  styleUrls: ['./product-order-detail.component.css']
})
export class ProductOrderDetailComponent implements OnInit {

  id: any;
  temp:any = {};
  postID:any = {};
  item:any = {};
  statusForm: any;
  dropDownData: any = []
  pdfdata: any;
  sellerData:any
  userData:any
  productData:any
  productList:any=[]
  driverData:any

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

   
    this.serviceCaller.postApi('/api/v1/admin/productOrderDetail',apireq,0).subscribe((data:any)=>{
      if(data.response_code==200){
        this.item = data.Data.orderDetail;
        this.sellerData = data.Data.sellerDetail;
        this.userData = data.Data.checkUser;
        this.productData = data.Data;
        this.productList = data.Data.productList;
        this.driverData = data.Data.driverDetail;
      }
      else{
        console.log(data.response_message)
      }
    },error=>{
      console.log("Something went wrong")
    })
  }


}
