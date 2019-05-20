import { Component, OnInit } from '@angular/core';
import {ProjectSearchComponent} from '../project-search/project-search.component';
import {TaskService} from '../task.service';
import{Task} from '../model/task';
import { MatDialog } from '@angular/material';
import {MatTableDataSource,MatSort,MatPaginator} from '@angular/material';
import {Observable} from "rxjs/index";
import { error } from '@angular/compiler/src/util';
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http";
import { Router } from '@angular/router';
@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {
  selectedProjectId:number;
  ProjectName:string='';
  Tasks:Task[];
  dataSource : MatTableDataSource<Task>;
  filterValue:string='';
  lastSortParam:string;
  lastsortdirectPriority:string="desc";
  lastsortdirectStdate:string="desc";
  lastsortdirectedate:string="desc";
  lastsortdirectstatus:string="desc";
  constructor(private taskService:TaskService,private dialog: MatDialog, private router: Router) { }
  displayedColumns: string[] = ['TaskName', 'ParentTaskName', 'Priority', 'StartDate','EndDate','customColumn1','customColumn2'];

 

  ngOnInit() {
    this.GetAllTasks();
  }
  OpenProjectModal() {
    const dialogRef = this.dialog.open(ProjectSearchComponent, {
      width: '600px',
      height: '400px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedProjectId = result.ProjectId;
      this.ProjectName=result.ProjectName;
      this.filterValue=result.ProjectId;
      this.dataSource.filter = this.filterValue;
    });
  }
  GetAllTasks()
  {
     this.taskService.GetAllTask().subscribe(data=>
      {
        this.Tasks=data;
        this.Tasks.forEach(item=>{
          if(item.StartDate!==undefined && item.StartDate!==null )
          {
            item.StartDate=new Date(item.StartDate).toISOString().substring(0,10);
          }
          if(item.EndDate!==undefined && item.EndDate!==null )
          {
            item.EndDate=new Date(item.EndDate).toISOString().substring(0,10);
          }
        })
        if(this.Tasks)
        { 
           if(!this.lastSortParam){
           this.dataSource = new MatTableDataSource(this.Tasks);
           this.dataSource.filterPredicate = this.ApplyFilter();
           this.dataSource.filter = this.filterValue;
           }
           else{
             this.SetSortParam(this.lastSortParam);
           }
        
        }
      }
      
     );

  }
  SetSortParam(param: string) {
    this.lastSortParam=param;
   
    if(param==="StartDate")
       this.SortByStartDate();
    if(param==="EndDate")
       this.SortByEndDate();
    if(param==="Priority")
       this.SortByPriority()
      if(param==="Status")
        this.SortByStatus();
      this.dataSource = new MatTableDataSource(this.Tasks);
      this.dataSource.filterPredicate = this.ApplyFilter();
      this.dataSource.filter = this.filterValue;
  }
  SortByPriority(){
    if(this.lastsortdirectPriority==="desc")
       this.lastsortdirectPriority="asc";
    else
       this.lastsortdirectPriority="desc";
    this.Tasks.sort((a, b) =>{
      if(a.Priority>b.Priority) 
        return this.lastsortdirectPriority==="asc"?1:-1;
      if(a.Priority<b.Priority)
        return this.lastsortdirectPriority==="asc"?-1:1;
      else
        return 0;
       
     
     });

  }
  SortByStartDate(){
    if(this.lastsortdirectStdate==="desc")
       this.lastsortdirectStdate="asc";
    else
       this.lastsortdirectStdate="desc";
    this.Tasks.sort((a, b) =>{
      if(a.StartDate>b.StartDate) 
        return this.lastsortdirectStdate==="asc"?1:-1;
      if(a.StartDate<b.StartDate)
        return this.lastsortdirectStdate==="asc"?-1:1;
      else
        return 0;
       
     
     });

  }
  SortByEndDate(){
    if(this.lastsortdirectedate==="desc")
       this.lastsortdirectedate="asc";
    else
       this.lastsortdirectedate="desc";
    this.Tasks.sort((a, b) =>{
      if(a.EndDate>b.EndDate) 
        return this.lastsortdirectedate==="asc"?1:-1;
      if(a.EndDate<b.EndDate)
        return this.lastsortdirectedate==="asc"?-1:1;
      else
        return 0;
       
     
     });

  }
  SortByStatus(){
    if(this.lastsortdirectstatus==="desc")
       this.lastsortdirectstatus="asc";
    else
       this.lastsortdirectstatus="desc";
    this.Tasks.sort((a, b) =>{
      if(a.Status===null && b.Status !==null)
        return this.lastsortdirectstatus==="asc"?-1:1;
      if(a.Status!==null && b.Status ===null)
        return this.lastsortdirectstatus==="asc"?1:-1;
      if(a.Status===null && b.Status ===null)
        return 0;
      if(a.Status>b.Status) 
        return this.lastsortdirectstatus==="asc"?1:-1;
      if(a.Status<b.Status)
        return this.lastsortdirectstatus==="asc"?-1:1;
      else
        return 0;
       
     
     });

  }
  ApplyFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      //this.isError=false;
      
      //let searchTerms = JSON.parse(filter);
      let searchTerms = JSON.stringify(filter); 
       if ((JSON.stringify(data.ProjectId).toLowerCase()===searchTerms.toLowerCase()) 
          || searchTerms.toLowerCase()==='')         
          
          return true;
        else
          return false;

    
     
      
    }
    return filterFunction;
  }
  EndTask(t:Task)
  {
      t.Status="Completed";
      this.taskService.EditTask(t).subscribe(data=>{
        this.GetAllTasks();
      
       }
      
      );
   
  }
  EditTask(t:Task){
    this.router.navigate(['/AddTask', { Id: t.TaskId}]);

  }
  DisableButton(t:Task):boolean{
    if(t.Status==="Completed")
    {
        
          return true;
       
    }
    else{
      return false
    }
     

  }


}
