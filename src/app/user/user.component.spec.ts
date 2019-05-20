import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatTableModule } from '@angular/material';


import { UserSearchComponent } from '../user-search/user-search.component';
import {ProjectSearchComponent} from '../project-search/project-search.component';
import {ParenttaskSearchComponent} from '../parenttask-search/parenttask-search.component';
import { AppRoutingModule } from '../app-routing.module';
import { ViewtaskComponent } from '../viewtask/viewtask.component';

import { ProjectComponent } from '../project/project.component';
import { SortPipe } from '../pipes/sort.pipe';
import { FilterPipe } from '../pipes/filter.pipe';

import { UserComponent } from './user.component';
import { AddtaskComponent } from '../addtask/addtask.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule,ReactiveFormsModule,HttpClientModule,MatDialogModule,RouterModule,AppRoutingModule,MatTableModule],
      declarations: [ AddtaskComponent,UserSearchComponent,ProjectSearchComponent,ParenttaskSearchComponent,ViewtaskComponent,UserComponent,ProjectComponent,
        SortPipe, FilterPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
