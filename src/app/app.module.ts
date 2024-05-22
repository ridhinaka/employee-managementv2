import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { MaterialModule } from './material/material.module';
import { RegisterEmployeeComponent } from './pages/register-employee/register-employee.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MasterComponent } from './master/master.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';
import { DetailEmployeeComponent } from './pages/detail-employee/detail-employee.component';
import { EmployeeEditModal } from './pages/employee-list/emloyee-edit-modal/employee-edit-modal';
import { FormEmployeeComponent } from './components/form-employee/form-employee.component';
import { ToastrModule } from 'ngx-toastr';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { KodokComponent } from './app/components/kodok/kodok.component';
@NgModule({
  declarations: [ 
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidenavComponent,
    MasterComponent,
    EmployeeEditModal,
    EmployeeListComponent,
    RegisterEmployeeComponent,
    NotFoundComponent,
    DetailEmployeeComponent,
    FormEmployeeComponent,
    SpinnerComponent,
    KodokComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ToastrModule.forRoot({
      timeOut:1000,
      progressBar:true,
      progressAnimation:'increasing',
      preventDuplicates:true
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
