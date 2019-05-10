import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddtaskComponent} from './addtask/addtask.component';
import {ProjectComponent} from './project/project.component';
import {UserComponent} from './user/user.component';
import {ViewtaskComponent} from './viewtask/viewtask.component';

const routes: Routes = [
  { path: 'AddTask', component: AddtaskComponent },
  {path: 'AddTask/:Id', component: AddtaskComponent},
  { path: 'ViewTask',    component: ViewtaskComponent },
  { path: 'User',    component: UserComponent },
  { path: 'Project',    component: ProjectComponent },
  { path: '',   redirectTo: '/Project', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
