import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatTableModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { AddtaskComponent } from './addtask.component';
import { UserSearchComponent } from '../user-search/user-search.component';
import {ProjectSearchComponent} from '../project-search/project-search.component';
import {ParenttaskSearchComponent} from '../parenttask-search/parenttask-search.component';
import { AppRoutingModule } from '../app-routing.module';
import { ViewtaskComponent } from '../viewtask/viewtask.component';
import { UserComponent } from '../user/user.component';
import { ProjectComponent } from '../project/project.component';
import { SortPipe } from '../pipes/sort.pipe';
import { FilterPipe } from '../pipes/filter.pipe';

describe('AddtaskComponent', () => {
  let component: AddtaskComponent;
  let fixture: ComponentFixture<AddtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule,ReactiveFormsModule,HttpClientModule,MatDialogModule,RouterModule,AppRoutingModule,MatTableModule],
      declarations: [ AddtaskComponent,UserSearchComponent,ProjectSearchComponent,ParenttaskSearchComponent,ViewtaskComponent,UserComponent,ProjectComponent,
        SortPipe, FilterPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    expect(component.taskForm.valid).toBeFalsy();
});

it('Task Name validity', () => {
    const taskName = component.taskForm.controls['taskName'];
    expect(taskName.valid).toBeFalsy();
});
it('form valid when not empty', () => {
  component.taskForm.controls['taskName'].setValue('first name');
  component.taskForm.controls['StartDate'].setValue('01/01/2019');
  component.taskForm.controls['EndDate'].setValue('02/02/2019');
  expect(component.taskForm.valid).toBeTruthy();
});


});
