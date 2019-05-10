import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http";
import { catchError, map, tap} from 'rxjs/operators';
import {Observable} from "rxjs/index";
import{ParentTask} from './model/parent-task';

@Injectable({
  providedIn: 'root'
})
export class ParentTaskService {
  ParentTaskApiUrl:string="http://localhost:8080/api/ParentTask";
  
  pTasks:ParentTask[];

  constructor(private http:HttpClient) { }

  GetAllParentTasks():Observable<ParentTask[]>{
      
    return this.http.get<ParentTask[]>(this.ParentTaskApiUrl);
  }
  AddParentTask(value:ParentTask):Observable<any>{
    return this.http.post(this.ParentTaskApiUrl,value);

  }
}
