import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/app/environments/environment';
import { Router } from '@angular/router';
import { MainConfigService } from 'src/app/main-config.service';
import { StorageService } from 'src/app/storage-service.service';
import { EmployeeList } from 'src/app/dummydata';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  constructor(
    private router: Router,
    private mainconfig:MainConfigService,
    private toastr: ToastrService,
    private storageService:StorageService) { }

  hide = false;
  isLoading = false;
  loginFormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  login(){
    if(this.loginFormGroup.invalid){
      this.loginFormGroup.markAllAsTouched();
      this.toastr.error('Please fill all the form');
      return;
    }

    if(this.loginFormGroup.value.username == environment.USERNAME && this.loginFormGroup.value.password == environment.PASSWORD){
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.mainconfig.menuSelected = 'Employee List' ;
        this.storageService.saveData('access_token',JSON.stringify(environment.TOKEN));
        this.storageService.saveData('EmployeeList', JSON.stringify(EmployeeList));
        this.router.navigate(['']); 
      }, 1000);
    }else{
      this.toastr.error('Invalid username or password');
    }
  }
}
