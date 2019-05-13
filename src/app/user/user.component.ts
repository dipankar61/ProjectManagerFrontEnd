import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Observable} from "rxjs/index";
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http";
import { error } from '@angular/compiler/src/util';
import {UserService} from '../user.service';
import{User} from '../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm:FormGroup;
  model:User=new User();
  users:User[];
  successMsg: string;
  errorMsg: string;
  isSuccess:boolean=false;
  isError:boolean=false;
  isEdit:boolean=false;
  path: string;
  order: number = 1;
  //searchParam:string;

  constructor(private userService:UserService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    this.userForm = this.formBuilder.group({
      firstName: new FormControl('',Validators.required) ,
      lastName: new FormControl('',Validators.required),
      empId:new FormControl('',[Validators.pattern("^[0-9]*$"),Validators.required])
    });
    this.GetAllUsers();
  }
  get f() { return this.userForm.controls; }
  onSubmit(){
     this.isError=false;
     this.isSuccess=false;
     this.model.FirstName=this.userForm.value.firstName;
     this.model.LastName=this.userForm.value.lastName;
     this.model.EmployeeId=this.userForm.value.empId;
     if(!this.isEdit)
        this.AddUser()
      else
      {
        this.EditUser();
      }

  }
  OnEdit(user:User)
  {
     this.isEdit=true;
     this.model=user;
     this.userForm.patchValue({
      firstName: user.FirstName,
      lastName: user.LastName,
      empId: user.EmployeeId
    });
  }
  ResetForm(){
    this.isError=false;
    this.isSuccess=false;
    this.isEdit=false;
    this.userForm.reset();
  }
  AddUser()
  {
    this.userService.AddUser(this.model).subscribe(data=>{
      this.isSuccess=true;
      this.successMsg="User has been added successfully";
      this.GetAllUsers();
    },
      (error:Error)=>this.HandleError(error,"onSubmit"));
  }
  EditUser()
  {
    this.userService.EditUser(this.model).subscribe(data=>{
      this.isSuccess=true;
      this.successMsg="User has been updated successfully";
      this.GetAllUsers();
    },
      (error:Error)=>this.HandleError(error,"onSubmit"));
  }
  DeleteUser(user:User)
  {
    this.userService.DeleteUser(user.UserId.toString()).subscribe(data=>{
      this.isSuccess=true;
      this.successMsg="User has been deleted successfully";
      this.GetAllUsers();
    },
      (error:Error)=>this.HandleError(error,"onSubmit"));
  }
  GetAllUsers()
  {
     this.userService.GetUsers().subscribe(data=>
      {
        this.users=data;
      },
      (error:any)=>{this.HandleError(error,"GetAllUsers")}
     );

  }
  SetSortParam(param: string) {
    this.isError=false;
    this.isSuccess=false;
    this.path = param;
    this.order = this.order * -1;
  }
  HandleError(err:any,orgOfError:string)
  {
    if((err.status===500|| err.status===0) )
    {
      this.isError=true;
      this.errorMsg=orgOfError==="onSubmit"?"System error. Please try again later":"Users loading failed";

    }
    
    if(err.status===400 )
    {
      this.isError=true;
      this.errorMsg=err.error.Message;
      
    }
  }

}
