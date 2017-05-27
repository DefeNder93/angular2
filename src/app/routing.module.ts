import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestComponent} from './test/test.component';
import {TaskComponent} from './tasks/task/task.component';
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {path: '',     redirectTo: '/', pathMatch: 'full'},
  {path: 'test', component: TestComponent},
  {path: 'task/:id', component: TaskComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
