import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http";
import { catchError, map, tap} from 'rxjs/operators';
import {Observable} from "rxjs/index";
import{Task} from './model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  TaskApiUrl:string="http://localhost:8080/api/Task";
  
  tasks:Task[];

  constructor(private http:HttpClient) { }
  GetAllTask():Observable<Task[]>{
      
    return this.http.get<Task[]>(this.TaskApiUrl);
  }
  GetTask(id:string):Observable<Task>{
    const params = new HttpParams()
    .set('Id', id);
    
    return this.http.get<Task>(this.TaskApiUrl,{params});
  }
   
  Addtask(value:Task):Observable<any>{
    return this.http.post(this.TaskApiUrl,value);

  }
  EditTask(value:Task):Observable<any>{
    return this.http.put(this.TaskApiUrl,value);

  }
}
