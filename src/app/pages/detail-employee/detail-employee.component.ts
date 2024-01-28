import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { StorageService } from 'src/app/storage-service.service';
import { Employee } from 'src/app/models/Employee';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.scss']
})
export class DetailEmployeeComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute,
    private route: Router,
    private toastr: ToastrService,
    private storageService: StorageService
  ) { }

  isLoading = false;
  idEmployee = null;
  employeeList = JSON.parse(this.storageService.getData('EmployeeList'));
  searchEmployeeForm = new FormControl('');
  employeeData:any = {};

  filteredOptions: Observable<Employee[]> = new Observable<Employee[]>(); 

   filterAutoComplete(value: string): Employee[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value['userName'];
  
    return this.employeeList.filter((option: Employee) => option.userName.toLowerCase().includes(filterValue));
  }

  displayDetail(value:string){
    return this.employeeData[value] || ''
  }

  showDetail(){
    return Object.keys(this.employeeData).length > 0 ? true : false;
  }

  setClassLabel(status: string) {
    return status === 'Inactive' ? 'tags tags-red' : 'tags tags-green'
  }

  redirectToEmployeeList(){
    this.employeeData = {};
    this.searchEmployeeForm.setValue('');
    this.route.navigate(['app/employee-list']);
  }

  searchDetailEmployee(){
    const dataListEmployee = JSON.parse(this.storageService.getData('EmployeeList'));
    const findEmployee = dataListEmployee.find((item:Employee) => item.userName === this.searchEmployeeForm.value);

    if(findEmployee){
      this.isLoading = true;

      setTimeout(() => {
        this.employeeData = findEmployee;
        this.isLoading = false;
        this.toastr.success('Success retrieve employee data');
      }, 500);
    }else{
      this.employeeData = {};
      this.toastr.error('Employee not found');
    }
  }


  ngOnInit(): void {
    this.filteredOptions = this.searchEmployeeForm.valueChanges.pipe(
      startWith(''),
      map(value => this.filterAutoComplete(value || ''))
    );

    if (this.activeRoute.snapshot.params['id']) {
      this.idEmployee = this.activeRoute.snapshot.params['id'];
      this.employeeData = this.storageService.getDatabyID('EmployeeList', this.idEmployee);
      this.searchEmployeeForm.setValue(this.employeeData['userName']);
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      },1000);
    }
  }
}
