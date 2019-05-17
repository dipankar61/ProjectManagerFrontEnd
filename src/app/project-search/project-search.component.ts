import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {Observable} from "rxjs/index";
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http";
import { error } from '@angular/compiler/src/util';
import {ProjectService} from '../project.service';
import{Project} from '../model/project';

@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.css']
})
export class ProjectSearchComponent implements OnInit {
  model:Project=new Project();
  projects:Project[];
  errorMsg: string;
  isError:boolean=false;

  constructor(public dialModalRef: MatDialogRef<ProjectSearchComponent>,private projService:ProjectService) { }

  ngOnInit() {
    this.GetAllProjects();
  }
  OnSelect(Proj: any) {
    this.model = Proj;
    this.dialModalRef.close(this.model);
  }
  
  GetAllProjects()
  {
     this.projService.GetProjects().subscribe(data=>
      {
        this.projects=data;
        this.projects.forEach(item=>{
          if(item.StartDate!==undefined && item.StartDate!==null )
          {
            item.StartDate=new Date(item.StartDate).toISOString().substring(0,10);
          }
          if(item.EndDate!==undefined && item.EndDate!==null )
          {
            item.EndDate=new Date(item.EndDate).toISOString().substring(0,10);
          }
        })
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
