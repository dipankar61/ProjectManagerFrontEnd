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
  model:User;
  successMsg: string;
  errorMsg: string;
  isSuccess:boolean=false;
  isError:boolean=false;
  isEdit:boolean=false;

  constructor(private userService:UserService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    this.userForm = this.formBuilder.group({
      firstName: new FormControl('',Validators.required) ,
      lastName: new FormControl('',Validators.required),
      empId:new FormControl('',[Validators.pattern("^[0-9]*$"),Validators.required])
    });
  }
  get f() { return this.userForm.controls; }
  onSubmit(){
    

  }
  ResetForm(){
    this.isError=false;
    this.isSuccess=false;
    this.isEdit=false;
    this.userForm.reset();
  }
  

}
