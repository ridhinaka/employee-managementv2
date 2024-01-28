import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { RegisterEmployeeComponent } from './pages/register-employee/register-employee.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MasterComponent } from './master/master.component';
import { DetailEmployeeComponent } from './pages/detail-employee/detail-employee.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'app/employee-list',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'app',
    component: MasterComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'employee-list',
        component: EmployeeListComponent
      },
      {
        path: 'register-employee',
        component: RegisterEmployeeComponent
      },
      {
        path: 'detail-employee',
        component: DetailEmployeeComponent
      },
      {
        path: 'detail-employee/:id',
        component: DetailEmployeeComponent
      }
    ]
  },
  {
     path: '**', 
     component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
