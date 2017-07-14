import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TaskComponent} from './tasks/task/task.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {TasksComponent} from './tasks/tasks.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'task/:id', component: TaskComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
