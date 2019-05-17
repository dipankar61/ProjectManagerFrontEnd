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

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  taskForm:FormGroup;
  projectForm:FormGroup;
  modelTask:Task=new Task();
  Tasks:Task[];
  modelPTask:ParentTask=new ParentTask();
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
  userId:number;
  selectedUser:User;
  selectedProject:Project;
  selectedParentTask:ParentTask;

  constructor(private taskService:TaskService,private pTaskService:ParentTaskService,private formBuilder: FormBuilder,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.startDate.setDate((this.startDate).getDate());
    this.endDate.setDate((this.endDate).getDate() + 1);
    this.taskForm=this.formBuilder.group({
      projName:new FormControl({ value: '', disabled: true }),
      taskName:new FormControl('',Validators.required),
      parentTaskCheck:new FormControl(),
      parentTask:new FormControl({ value: '', disabled: true }),
      StartDate:new FormControl({value:this.startDate.toISOString().substring(0,10),disabled: false}),
      EndDate:new FormControl({value:this.endDate.toISOString().substring(0,10),disabled: false}),
      Priority:new FormControl(),
      UserName:new FormControl({ value: '', disabled: true })
     
     }
     );
  }

  get f() { return this.taskForm.controls; }
  OpenProjectModal() {
    const dialogRef = this.dialog.open(ProjectSearchComponent, {
      width: '600px',
      height: '400px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedProject = result;
      this.taskForm.patchValue({ projName: result.ProjectName });
    });
  }

  OpenUserModal() {
    const dialogRef = this.dialog.open(UserSearchComponent, {
      width: '600px',
      height: '400px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedUser = result;
      this.taskForm.patchValue({ UserName: result.FirstName + ' ' + result.LastName });
    });
  }

  OpenParentTaskModal() {
    const dialogRef = this.dialog.open(ParenttaskSearchComponent, {
      width: '600px',
      height: '400px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedParentTask = result;
      this.taskForm.patchValue({ parentTask: result.TaskName });
    });
  }

}
