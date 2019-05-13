import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule, MatTableModule,MatSortModule,MatPaginatorModule,MatButtonModule, MatSelectModule, MatIconModule,MatDatepickerModule,MatNativeDateModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { MenuComponent } from './menu/menu.component';
import {ParentTaskService} from './parent-task.service';
import {ProjectService} from './project.service';
import {TaskService} from './task.service';
import {UserService} from './user.service';
import { FilterPipe } from './Pipes/filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProjectComponent,
    AddtaskComponent,
    ViewtaskComponent,
    MenuComponent,
    FilterPipe,
    SortPipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [ParentTaskService,ProjectService,TaskService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
