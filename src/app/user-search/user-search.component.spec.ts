import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatTableModule, MatDialogRef } from '@angular/material';

import { AppRoutingModule } from '../app-routing.module';
import { ViewtaskComponent } from '../viewtask/viewtask.component';
import { UserComponent } from '../user/user.component';
import { ProjectComponent } from '../project/project.component';
import { SortPipe } from '../pipes/sort.pipe';
import { FilterPipe } from '../pipes/filter.pipe';

import { AddtaskComponent } from '../addtask/addtask.component';
import { ParenttaskSearchComponent } from '../parenttask-search/parenttask-search.component';
import { UserSearchComponent } from './user-search.component';
import { ProjectSearchComponent } from '../project-search/project-search.component';

describe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule,ReactiveFormsModule,HttpClientModule,MatDialogModule,RouterModule,AppRoutingModule,MatTableModule],
      declarations: [ AddtaskComponent,UserSearchComponent,ProjectSearchComponent,ParenttaskSearchComponent,ViewtaskComponent,UserComponent,ProjectComponent,
        SortPipe, FilterPipe],
        providers: [
         
          {provide: MatDialogRef, useValue: {}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
