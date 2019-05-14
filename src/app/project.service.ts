import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http";
import { catchError, map, tap} from 'rxjs/operators';
import {Observable} from "rxjs/index";
import{Project} from './model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  ProjectApiUrl:string="http://localhost:8080/api/Project";
  projects:Project[];
  constructor(private http:HttpClient) { }
  GetProjects():Observable<Project[]>{
      
    return this.http.get<Project[]>(this.ProjectApiUrl);
  }
  
  AddProject(value:Project):Observable<any>{
    return this.http.post(this.ProjectApiUrl,value);

  }
  EditProject(value:Project):Observable<any>{
    return this.http.put(this.ProjectApiUrl,value);

  }
}
