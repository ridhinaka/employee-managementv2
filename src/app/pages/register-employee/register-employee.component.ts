import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Group,Status } from 'src/app/dummydata';
import { StorageService } from 'src/app/storage-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.scss']
})
export class RegisterEmployeeComponent implements OnInit {

  constructor(
    private storageService:StorageService,
    private toastr: ToastrService,
    private route: Router
  ) { }

  Groups = Group;
  StatusList = Status;

  dataEmployee = {};
  dataInvalid = false;
  triggerDataEmployeeBehaviorSubject = new BehaviorSubject<any>(false);


  registerNewEmployee(){
    this.triggerDataEmployeeBehaviorSubject.next(true);

    const uniqueId = this.storageService.generateID('EmployeeList');
    const getEmployeeList = this.storageService.getData('EmployeeList');
    const dataList = JSON.parse(getEmployeeList);

    if(!this.dataInvalid){
      this.dataEmployee = {
        id:uniqueId,
        ...this.dataEmployee
      };
      
      dataList.push(this.dataEmployee);
  
      this.storageService.saveData('EmployeeList',JSON.stringify(dataList));
      this.toastr.success('Success register new employee');
      this.triggerDataEmployeeBehaviorSubject.next(false);
      return;
    }

    this.toastr.error('Please fill all the form');
  }


  cancelCreate(){
    this.route.navigate(['app/employee-list']);
  }

  ngOnInit(): void {
  }
}
