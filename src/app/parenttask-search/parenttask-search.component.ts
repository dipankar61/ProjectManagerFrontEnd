import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {Observable} from "rxjs/index";
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http";
import { error } from '@angular/compiler/src/util';
import {ParentTaskService} from '../parent-task.service';
import{ParentTask} from '../model/parent-task';


@Component({
  selector: 'app-parenttask-search',
  templateUrl: './parenttask-search.component.html',
  styleUrls: ['./parenttask-search.component.css']
})
export class ParenttaskSearchComponent implements OnInit {
  model:ParentTask=new ParentTask();
  ParenTasks:ParentTask[];
  errorMsg: string;
  isError:boolean=false;

  constructor(public dialModalRef: MatDialogRef<ParenttaskSearchComponent>,private pTaskService:ParentTaskService) { }

  ngOnInit() {
    this.GetParentTasks();
  }
  OnSelect(pTask: any) {
    this.model = pTask;
    this.dialModalRef.close(this.model);
  }
  RemoveSelection()
  {
    this.dialModalRef.close(this.model);
  }
  GetParentTasks()
  {
     this.pTaskService.GetAllParentTasks().subscribe(data=>
      {
        this.ParenTasks=data;
      },
      (error:any)=>{this.HandleError(error)}
     );

  }
  HandleError(err:any)
  {
    if((err.status===500|| err.status===0) )
    {
      this.isError=true;
      this.errorMsg="System error. Please try again later";

    }
    
    if(err.status===400 )
    {
      this.isError=true;
      this.errorMsg=err.error.Message;
      
    }
  }

}
