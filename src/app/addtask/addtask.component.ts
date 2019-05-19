import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Observable} from "rxjs/index";
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http";
import { error } from '@angular/compiler/src/util';
import {TaskService} from '../task.service';
import {ParentTaskService} from '../parent-task.service';
import{Task} from '../model/task';
import{ParentTask} from '../model/parent-task';
import{DateComparison} from '../helper/date-comparison.validator';
import { MatDialog } from '@angular/material';
import { UserSearchComponent } from '../user-search/user-search.component';
import {ProjectSearchComponent} from '../project-search/project-search.component';
import {ParenttaskSearchComponent} from '../parenttask-search/parenttask-search.component';
import {Project} from '../model/project';
import { User } from '../model/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  taskForm:FormGroup;
  projectForm:FormGroup;
  modelTask:Task;
  Tasks:Task[];
  modelPTask:ParentTask;
  parentTasks:Task[];
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
  isParentTask:boolean=false;
  TaskId:string;
  selectedUserId:number;
  selectedProjectId:number;
  selectedParentTaskId:number;
  IsProjNameValidated:boolean=true;
  IsUserNameValidated:boolean=true;

  constructor(private taskService:TaskService,private pTaskService:ParentTaskService,private formBuilder: FormBuilder,
    private dialog: MatDialog,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.startDate.setDate((this.startDate).getDate());
    this.endDate.setDate((this.endDate).getDate() + 1);
    this.taskForm=this.formBuilder.group({
      projName:new FormControl({ value: '', disabled: true },Validators.required),
      taskName:new FormControl('',Validators.required),
      parentTaskCheck:new FormControl({value:false,disabled: false}),
      parentTask:new FormControl({ value: '', disabled: true }),
      StartDate:new FormControl({value:this.startDate.toISOString().substring(0,10),disabled: false}),
      EndDate:new FormControl({value:this.endDate.toISOString().substring(0,10),disabled: false}),
      Priority:new FormControl(),
      UserName:new FormControl({ value: '', disabled: true })
      
     
     },
     {
      validator: DateComparison('StartDate', 'EndDate','parentTaskCheck','addtask')
     }
     );
     this.route.params.subscribe((data) => {
     
      this.TaskId = data.Id;
      if(this.TaskId!==undefined && this.TaskId!==null && this.TaskId!=="")
      {
       this.EditMode();
      }
      else{
        this.ResetForm();
      }
    });
  }

  get f() { return this.taskForm.controls; }
  SetParentTask(e:any){
    if(e.target.checked)
    {
      this.taskForm.get('StartDate').disable();
      this.taskForm.get('EndDate').disable();
      this.taskForm.get('Priority').disable();
      this.taskForm.patchValue({ parentTask: '',
       StartDate: '',
       EndDate: '',
       Priority: '',
       UserName:'',
       projName:''
      });
      this.isParentTask=true;
    }
    else{
      this.taskForm.get('StartDate').enable();
      this.taskForm.get('EndDate').enable();
      this.taskForm.get('Priority').enable();
      this.taskForm.patchValue({ 
      StartDate: this.startDate.toISOString().substring(0,10),
      EndDate: this.endDate.toISOString().substring(0,10)});
      this.isParentTask=false;
    }
  

  }
  OpenProjectModal() {
    const dialogRef = this.dialog.open(ProjectSearchComponent, {
      width: '600px',
      height: '400px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedProjectId = result.ProjectId;
      this.taskForm.patchValue({ projName: result.ProjectName });
      this.IsProjNameValidated=true;
    });
  }

  OpenUserModal() {
    const dialogRef = this.dialog.open(UserSearchComponent, {
      width: '600px',
      height: '400px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedUserId = result.UserId;
      this.taskForm.patchValue({ UserName: result.FirstName + ' ' + result.LastName });
      this.IsUserNameValidated=true;
    });
  }

  OpenParentTaskModal() {
    const dialogRef = this.dialog.open(ParenttaskSearchComponent, {
      width: '600px',
      height: '400px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.ParentId)
      {
      this.selectedParentTaskId = result.ParentId;
      this.taskForm.patchValue({ parentTask: result.TaskName });
      }
      else{
        this.selectedParentTaskId=null;
        this.taskForm.patchValue({ parentTask: '' });

      }
    });
  }
  onSubmit(){
    this.isError=false;
    this.isSuccess=false;
    if(this.taskForm.value.parentTaskCheck===true)
    {
       this.modelPTask=new ParentTask();
       this.modelPTask.TaskName=this.taskForm.value.taskName;
       this.AddParentTask();
    }
    else 
    {
      if(this.SubmitEligibilityCheck())
      {
       if(!this.isEdit)
       {
          this.modelTask=new Task();
       }
       if(this.taskForm.value.Priority)
       {
          this.modelTask.Priority=this.taskForm.value.Priority;
       }
       else{
          this.modelTask.Priority=0;
       }
       this.modelTask.UserId=this.selectedUserId;
       this.modelTask.ProjectId=this.selectedProjectId;
       
       this.modelTask.ParentId=this.selectedParentTaskId;
      
       this.modelTask.TaskName=this.taskForm.value.taskName;
       this.modelTask.StartDate=this.taskForm.value.StartDate;
       this.modelTask.EndDate=this.taskForm.value.EndDate;
       if(!this.isEdit)
       {
          this.AddTask()
       }
       else{
         this.EditTask();
       }
      }
    }


  }
  SubmitEligibilityCheck():boolean
  {
    let eligibilityPass:boolean=true;
    if(!this.selectedProjectId)
    {
      eligibilityPass=false;
      this.IsProjNameValidated=false;
    }
    if(!this.selectedUserId)
    {
      eligibilityPass=false;
      this.IsUserNameValidated=false;
    }

    return eligibilityPass;
  }
  EditMode()
  {
    this.isError=false;
    this.isSuccess=false;
    this.isEdit=true;
    this.GetTask(this.TaskId);
    
    this.taskForm.get('parentTaskCheck').disable();
    

  }
  ResetForm(){
    this.startDate = new Date();
    this.endDate = new Date();
    this.startDate.setDate((this.startDate).getDate());
    this.endDate.setDate((this.endDate).getDate() + 1);
    this.isError=false;
    this.isSuccess=false;
    this.isEdit=false;
    this.isParentTask=false;
    this.taskForm.reset();
    this.taskForm.controls['Priority'].setValue(0);
    this.taskForm.get('StartDate').enable();
      this.taskForm.get('EndDate').enable();
      this.taskForm.get('Priority').enable();
      this.taskForm.patchValue({ 
      StartDate: this.startDate.toISOString().substring(0,10),
      EndDate: this.endDate.toISOString().substring(0,10)});
      this.taskForm.get('parentTaskCheck').enable();
    
  }
  Cancel()
  {
    this.router.navigate(['/ViewTask']);
  }
  AddParentTask()
  {
    this.pTaskService.AddParentTask(this.modelPTask).subscribe(data=>{
      this.isSuccess=true;
      this.successMsg="Parent Task has been added successfully";
      
    },
      (error:Error)=>this.HandleError(error,"onSubmit"));
  }
  AddTask()
  {
    this.taskService.Addtask(this.modelTask).subscribe(data=>{
      this.isSuccess=true;
      this.successMsg="Task has been added successfully";
     
    },
      (error:Error)=>this.HandleError(error,"onSubmit"));
  }
  EditTask()
  {
    this.taskService.EditTask(this.modelTask).subscribe(data=>{
      this.isSuccess=true;
      this.successMsg="User has been updated successfully";
      
    },
      (error:Error)=>this.HandleError(error,"onSubmit"));
  }
  GetTask(id:string)
  {
     this.taskService.GetTask(id).subscribe(data=>
      {
        
        
          if(data.StartDate!==undefined && data.StartDate!==null )
          {
            data.StartDate=new Date(data.StartDate).toISOString().substring(0,10);
          }
          if(data.EndDate!==undefined && data.EndDate!==null )
          {
            data.EndDate=new Date(data.EndDate).toISOString().substring(0,10);
          }
          this.modelTask=data;
          this.selectedParentTaskId=this.modelTask.ParentId;
          this.selectedProjectId=this.modelTask.ProjectId;
          this.selectedUserId=this.modelTask.UserId;
          this.taskForm.patchValue({
            taskName: this.modelTask.TaskName,
            Priority: this.modelTask.Priority,
            StartDate: this.modelTask.StartDate,
            EndDate: this.modelTask.EndDate,
            projName: this.modelTask.ProjectName,
            UserName:this.modelTask.UserName ,
            parentTask: this.modelTask.ParentTaskname
            
          });

       
      },
      (error:any)=>{this.HandleError(error,"GetTask")}
     );

  }
  HandleError(err:any,orgOfError:string)
  {
    if((err.status===500|| err.status===0) )
    {
      this.isError=true;
      this.errorMsg=orgOfError==="onSubmit"?"System error. Please try again later":"Task loading failed";

    }
    
    if(err.status===400 )
    {
      this.isError=true;
      this.errorMsg=err.error.Message;
      
    }
  }

}
