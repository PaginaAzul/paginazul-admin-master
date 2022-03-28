import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-edit-static-content',
  templateUrl: './edit-static-content.component.html',
  styleUrls: ['./edit-static-content.component.css']
})
export class EditStaticContentComponent implements OnInit {
  id: any;
  pageName: any;
  staticContentForm: FormGroup

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: AppService,
    private route: Router,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit() {
    this.getId()

    this.formValidation()
    this.getContent()
  }

  getId() {
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;
    });
  }

  formValidation() {
    this.staticContentForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      portDescription: new FormControl('', [Validators.required])
    })
  }

  getContent() {
    let apiData =
    {
      "type": this.id
    }

    this.spinner.show()
    this.service.postApi('/api/v1/admin/staticContentGet', apiData, 1).subscribe((success) => {
      if (success.response_code == 200) {
        this.spinner.hide()
        this.staticContentForm.controls['type'].setValue(success.Data.title)
        this.staticContentForm.controls['description'].setValue(success.Data.description)
        this.staticContentForm.controls['portDescription'].setValue(success.Data.portDescription)
      }
      else {
        this.spinner.hide()
        if (success.response_code == 500) {
          this.service.err(success.response_message)
        } else {
          this.spinner.hide()
          this.service.err(success.response_message)
        }
      }
    }, error => {
      this.spinner.hide()
      this.service.err("something went wrong")
    })
  }
  Update(data) {

    let apiData =
    {
      "type": this.id,
      "description": data.description,
      "portDescription": data.portDescription,
      "adminId": localStorage.getItem('_id')
    }

    this.spinner.show()
    this.service.postApi('/api/v1/admin/StaticContentUpdate', apiData, 1).subscribe((success) => {

      if (success.response_code == 200) {
        this.spinner.hide()
        this.service.succ(success.response_message)
        this.route.navigate(['../../admin/staticContent/']);
      }
      else {
        if (success.response_code == 500) {
          this.spinner.hide()
          this.service.err(success.response_message)
        } else {
          this.spinner.hide()
          this.service.err(success.response_message)
        }
      }
    }, error => {
      this.spinner.hide()
      this.service.err("something went wrong")
    })
  }
}
