import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Observable} from "rxjs/index";
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http";
import { error } from '@angular/compiler/src/util';
import {ProjectService} from '../project.service';
import{Project} from '../model/project';
import{DateComparison} from '../helper/date-comparison.validator'

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectForm:FormGroup;
  model:Project=new Project();
  projects:Project[];
  successMsg: string;
  errorMsg: string;
  isSuccess:boolean=false;
  isError:boolean=false;
  isEdit:boolean=false;
  path: string;
  order: number = 1;
  isSetDateCheck=false;
  startDate:Date;
  endDate:Date;

  constructor(private projService:ProjectService,private formBuilder: FormBuilder) { }

  ngOnInit() {
     this.projectForm=this.formBuilder.group({
      projectName:new FormControl('',Validators.required),
      SetDate:new FormControl(),
      StartDate:new FormControl({value:'',disabled:!this.isSetDateCheck}),
      EndDate:new FormControl({value:'',disabled:!this.isSetDateCheck}),
      Priority:new FormControl(),
      Manager:new FormControl({ value: '', disabled: true })
     },
     {
      validator: DateComparison('StartDate', 'EndDate','SetDate')
     }
     );
  }
  get f() { return this.projectForm.controls; }
  SetStartEndDate(e:any)
  {
    if(e.target.checked)
    {
      this.startDate = new Date();
      this.endDate = new Date();
      this.startDate.setDate((this.startDate).getDate());
   
      this.endDate.setDate((this.endDate).getDate() + 1);
      this.projectForm.controls['StartDate'].setValue(this.startDate.toISOString().substring(0,10));
      this.projectForm.controls['EndDate'].setValue(this.endDate.toISOString().substring(0,10));
      this.projectForm.get('StartDate').enable();
      this.projectForm.get('EndDate').enable();
    }
    else{
      this.projectForm.controls['StartDate'].setValue('');
      this.projectForm.controls['EndDate'].setValue('');
      this.projectForm.get('StartDate').disable();
      this.projectForm.get('EndDate').disable();

    }

  }

}
