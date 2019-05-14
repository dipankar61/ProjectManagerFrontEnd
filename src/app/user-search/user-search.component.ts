import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {Observable} from "rxjs/index";
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http";
import { error } from '@angular/compiler/src/util';
import {UserService} from '../user.service';
import{User} from '../model/user';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  model:User=new User();
  users:User[];
  errorMsg: string;
  isError:boolean=false;

  constructor(public dialModalRef: MatDialogRef<UserSearchComponent>,private userService:UserService) { }

  ngOnInit() {
    this.GetAllUsers();
  }
  OnSelect(user: any) {
    this.model = user;
    this.dialModalRef.close(this.model);
  }
  GetAllUsers()
  {
     this.userService.GetUsers().subscribe(data=>
      {
        this.users=data;
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
