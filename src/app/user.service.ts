import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http";
import { catchError, map, tap} from 'rxjs/operators';
import {Observable} from "rxjs/index";
import{User} from './model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  UserApiUrl:string="http://localhost:8080/api/User";
  Users:User[];
  constructor(private http:HttpClient) { }
  GetUsers():Observable<User[]>{
      
    return this.http.get<User[]>(this.UserApiUrl);
  }
  
  AddUser(value:User):Observable<any>{
    return this.http.post(this.UserApiUrl,value);

  }
  EditUser(value:User):Observable<any>{
    return this.http.put(this.UserApiUrl,value);
  }
  DeleteUser(Id:string):Observable<any>{
    const params = new HttpParams()
    .set('Id', Id);
    return this.http.delete(this.UserApiUrl,{params});

  }
}
