import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from '../../app.service';

declare var $: any
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  name: any;
  profilePic: string;
  sidemenu: any;
  url: any = [];
  data: { "userId": string; };
  userData: any;
  permissionData: any;

  constructor(private route: Router, private service: AppService) {
    this.profilePic = localStorage.getItem("profilePic")
    this.name = localStorage.getItem("name")
  }

  ngOnInit() {
    this.adminData();
    this.route.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url.split("/")
        this.sidemenu = this.url[this.url.length - 1]
      }
    })
    this.toggle()
  }

  toggle() {
    if ($(window).width() < 768) {
      $('body').removeClass('toggle-wrapper');
    } else if ($(window).width() > 767 && $(window).width() < 1025) {
      $('body').addClass('toggle-wrapper');
    }
    $(window).resize(function () {
      if ($(window).width() < 768) {
        $('body').removeClass('toggle-wrapper');
      } else if ($(window).width() > 767 && $(window).width() < 1025) {
        $('body').addClass('toggle-wrapper');
      }
    });
    $(".scroll-section, .sidebar").niceScroll({
      cursorborder: "",
      cursorcolor: "#EFC0ED",
      boxzoom: false
    });
    $(".btn-toggle,.close_panel").click(function () {
      $("body").toggleClass("toggle-wrapper");
    });


    $(document).on("click", ".top-user-img", function () {
      $(".head-drop-down").toggleClass("show");
    });

  }

  logout() {
    let apireq = {
      adminId: localStorage.getItem("_id")
    }
    this.service.postApi('/api/v1/admin/adminLogout', apireq, 1).subscribe((success) => {
      if (success.response_code == 200) {
        localStorage.removeItem('_id')
        localStorage.removeItem('LOGINTOKEN')
        localStorage.removeItem('name')
        localStorage.removeItem('userType')
        localStorage.removeItem('profilePic')
        localStorage.removeItem('userManagement')
        localStorage.removeItem('orderManagement')
        localStorage.removeItem('ratingManagement')
        localStorage.removeItem('staticManagement')
        localStorage.removeItem('bankManagement')
        localStorage.removeItem('settingManagement')
        this.route.navigate(['/login'])
      }
      else {

        this.service.err(success.response_message)
      }
    }, error => {
      console.log("Something went wrong")

    })
  }

  adminData() {
    this.data =
      {
        "userId": localStorage.getItem('_id'),
      }

    this.service.postApi('/api/v1/admin/getAdminDetail', this.data, 1)
      .subscribe((response: any) => {
        if (response.response_code == 200) {
          this.userData = response.Data;
          this.permissionData = response.Data.permission[0];
        } else {
          console.log("Something went wrong");
        }
      }, error => {
        this.service.error("SomeThing went wrong.")
      })
  }

}
