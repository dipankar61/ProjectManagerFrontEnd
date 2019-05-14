import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Observable} from "rxjs/index";
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http";
import { error } from '@angular/compiler/src/util';
import {ProjectService} from '../project.service';
import{Project} from '../model/project';
import{DateComparison} from '../helper/date-comparison.validator';
import { MatDialog } from '@angular/material';
import { UserSearchComponent } from '../user-search/user-search.component';

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
  userId:number;

  constructor(private projService:ProjectService,private formBuilder: FormBuilder,private dialog: MatDialog,) { }

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
  OpenModal() {
    const dialogRef = this.dialog.open(UserSearchComponent, {
      width: '600px',
      height: '400px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      this.projectForm.patchValue({ Manager: result.FirstName + ' ' + result.LastName });
      this.userId = result.UserId;
    });
  }
  onSubmit(){
    this.isError=false;
    this.isSuccess=false;
    this.model.ProjectName=this.projectForm.value.projectName;
    this.model.Priority=this.projectForm.value.Priority;
    if(this.userId)
      this.model.UserId=this.userId;
      this.model.Username=this.projectForm.value.Manager;
    if(this.projectForm.value===true)
    {
       this.model.StartDate=this.projectForm.value.StartDate;
       this.model.EndDate=this.projectForm.value.EndDate;
    }
    if(!this.isEdit)
       this.AddProject()
     else
     {
       this.EditProject();
     }

 }
  AddProject()
  {
    this.projService.AddProject(this.model).subscribe(data=>{
      this.isSuccess=true;
      this.successMsg="Project has been added successfully";
      this.GetAllProjects();
    },
      (error:Error)=>this.HandleError(error,"onSubmit"));
  }
  EditProject()
  {
    this.projService.EditProject(this.model).subscribe(data=>{
      this.isSuccess=true;
      this.successMsg="Project has been updated successfully";
      this.GetAllProjects();
    },
      (error:Error)=>this.HandleError(error,"onSubmit"));
  }
  
  GetAllProjects()
  {
     this.projService.GetProjects().subscribe(data=>
      {
        this.projects=data;
      },
      (error:any)=>{this.HandleError(error,"GetAllProjects")}
     );

  }
  HandleError(err:any,orgOfError:string)
  {
    if((err.status===500|| err.status===0) )
    {
      this.isError=true;
      this.errorMsg=orgOfError==="onSubmit"?"System error. Please try again later":"Users loading failed";

    }
    
    if(err.status===400 )
    {
      this.isError=true;
      this.errorMsg=err.error.Message;
      
    }
  }


}
