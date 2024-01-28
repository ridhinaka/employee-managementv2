import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/storage-service.service';
import { Employee } from 'src/app/models/Employee';
import { take } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeEditModal } from './emloyee-edit-modal/employee-edit-modal';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit, AfterViewInit {

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private storageService: StorageService
  ) { }

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataEmployeeList = new MatTableDataSource<any>([]);
  dataEmployeeListColumns: string[] = [
    'userName',
    'firstName',
    'lastName',
    'email',
    'birthDate',
    // 'basicSalary',
    'group',
    // 'description',
    'status',
    'action'
  ];

  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];
  searchData = new FormControl('');
  isLoading = false;

  redirectToRegisterEmployee() {
    this.router.navigate(['app/register-employee']);
  }

  searchDataEmployee() {
    this.isLoading = true;
    const search = this.searchData.value !== null ? this.searchData.value : '';
    this.dataEmployeeList.data = JSON.parse(this.storageService.getData('EmployeeList'));

    if(this.searchData.value !== '' && this.searchData.value !== null){
      this.storageService.saveData('searchEmployee', JSON.stringify(this.searchData.value));
    }

    if(this.searchData.value === '' || this.searchData.value === null){
      this.storageService.removeData('searchEmployee');
    }

    // this.dataEmployeeList.data = this.dataEmployeeList.data.filter((employee) =>
    //   employee.username.toLowerCase().includes(search.toLowerCase())
    // );

    
    this.dataEmployeeList.data = this.dataEmployeeList.data.filter((employee) =>
      (search ? employee.userName.toLowerCase().includes(search.toLowerCase()) : true) &&
      (search ? employee.firstName.toLowerCase().includes(search.toLowerCase()) : true)
    );

    this.dataEmployeeList.filter = '';

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  changePage(event: any) {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }


  deleteEmployee(employeeId: any) {
    this.isLoading = true; 

    setTimeout(() => {
      this.isLoading = false;
      const index = this.dataEmployeeList.data.findIndex(employee => employee.id === employeeId);
      this.dataEmployeeList.data.splice(index, 1);
      this.storageService.saveData('EmployeeList', JSON.stringify(this.dataEmployeeList.data));
      this.dataEmployeeList.filter = '';
      
      this.toastr.success('Success Delete Employee', '', {
        enableHtml: true,
        toastClass: 'toast-success-condition2'
      });
    }, 1000);
    

  }


  editEmployee(element: Employee) {
    const dialogRef = this.dialog.open(EmployeeEditModal, {
      data: element,
      width: '60%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response['statusCode'] === 1) {
        this.isLoading = true;

        setTimeout(() => {
          const index = this.dataEmployeeList.data.findIndex((employee) => employee.id === element.id);
          this.dataEmployeeList.data[index] = response['data'];
          this.storageService.saveData('EmployeeList', JSON.stringify(this.dataEmployeeList.data));
          this.dataEmployeeList.filter = '';
          this.isLoading = false;

          this.toastr.success('Success Update Employee', '', {
            enableHtml: true,
            toastClass: 'toast-success-condition1'
          });
        }, 1000);

      }
    });
  }

  detailEmployee(id:any) {
    this.router.navigate(['app/detail-employee', id]);
  }

  setClassLabel(status: string) {
    return status === 'Inactive' ? 'tags tags-red' : 'tags tags-green'
  }


  ngOnInit(): void {
    this.isLoading = true;


    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  ngAfterViewInit() {
    const getData = this.storageService.getData('EmployeeList');
    const getSearch = this.storageService.getData('searchEmployee');

    this.dataEmployeeList.data = JSON.parse(getData);
    this.dataEmployeeList.filter = '';
    this.dataEmployeeList.paginator = this.paginator;
    this.storageService.triggerDataBehaviorSubject.pipe(take(1)).subscribe((data: any) => {
      if (data) {
        this.dataEmployeeList.data.push(data);
        this.dataEmployeeList.filter = '';
        this.storageService.saveData('EmployeeList', JSON.stringify(this.dataEmployeeList.data));
      }
    });
    this.dataEmployeeList.sort = this.sort;

    if(getSearch && getSearch !== ''){
      let stringWithoutQuotes = getSearch.replace(/^"(.*)"$/, '$1');

      this.searchData.setValue(stringWithoutQuotes);
      this.searchDataEmployee();
    }
  }
}
