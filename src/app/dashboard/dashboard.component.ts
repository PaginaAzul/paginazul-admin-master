import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: any;

  constructor(
    public service: AppService,
    private router: Router
  ) {
    if (localStorage.getItem('LOGINTOKEN') == null && localStorage.getItem('_id') == null) {
      this.router.navigate(['/login'])
    }
  }

  ngOnInit() {
    this.getDataApi()
    $.fn.jQuerySimpleCounter = function( options ) {
      var settings = $.extend({
          start:  0,
          end:    100,
          easing: 'swing',
          duration: 400,
          complete: ''
      }, options );
  
      var thisElement = $(this);
  
      $({count: settings.start}).animate({count: settings.end}, {
      duration: settings.duration,
      easing: settings.easing,
      step: function() {
        var mathCount = Math.ceil(this.count);
        thisElement.text(mathCount);
      },
      complete: settings.complete
    });
  };

  }

  getDataApi() {
    let apireq = {
      "userId": localStorage.getItem("_id")
    }
    this.service.postApi("/api/v1/admin/totalCount", apireq, 1).subscribe((success) => {
      if (success.response_code == 200) {
        this.data = success.obj;
        $('#number1').jQuerySimpleCounter({end:this.data.User,duration: 3000});
        $('#number2').jQuerySimpleCounter({end:this.data.Post,duration: 3000});
        $('#number3').jQuerySimpleCounter({end:this.data.NormalUser,duration: 3000});
        $('#number4').jQuerySimpleCounter({end:this.data.DeliveryUser,duration: 3000});
        $('#number5').jQuerySimpleCounter({end:this.data.ProfessionalUser,duration: 3000});
        $('#number6').jQuerySimpleCounter({end:this.data.RequestProfessional,duration: 3000});
        $('#number7').jQuerySimpleCounter({end:this.data.RequestDelivery,duration: 3000});
        $('#number8').jQuerySimpleCounter({end:this.data.PendingOrder,duration: 3000});
        $('#number9').jQuerySimpleCounter({end:this.data.PendingOrder,duration: 3000});
        $('#number10').jQuerySimpleCounter({end:this.data.ActiveOrder,duration: 3000});
        $('#number11').jQuerySimpleCounter({end:this.data.PastOrders,duration: 3000});
        $('#number12').jQuerySimpleCounter({end:this.data.totalStore,duration: 3000});
        $('#number13').jQuerySimpleCounter({end:this.data.totalRestaurant,duration: 3000});
        $('#number14').jQuerySimpleCounter({end:this.data.totalDriver,duration: 3000});
        $('#number15').jQuerySimpleCounter({end:this.data.totalDriverRequest,duration: 3000});
        $('#number16').jQuerySimpleCounter({end:this.data.paymentData,duration: 3000});
        $('#number17').jQuerySimpleCounter({end:this.data.totalStoreRequest,duration: 3000});
        $('#number18').jQuerySimpleCounter({end:this.data.totalRestaurantRequest,duration: 3000});
      }
      else {
        this.router.navigate(['/login']);
        console.log("Something went wrong")
      }
    }, error => {
      console.log("Something went wrong")
    })
  }
}
