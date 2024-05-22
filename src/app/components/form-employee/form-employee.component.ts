import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, map, startWith } from 'rxjs';
import { Group, Status } from 'src/app/dummydata';


@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.scss']
})
export class FormEmployeeComponent implements OnInit,OnDestroy {

  constructor() { }

  @Input() triggerDataEmployeeBehaviorSubject = new BehaviorSubject<any>(false);
  @Input() setDataEditEmployeeBehaviorSubject = new BehaviorSubject<any>({});  
  @Input() dataEmployee: any = {};
  @Output() dataEmployeeChange = new EventEmitter<any>();
  @Input() dataInvalid = false;
  @Output() dataInvalidChange = new EventEmitter<any>(); 

  Groups = Group;
  StatusList = Status;
  subscriptionList:any[] = []; 
  minDate = new Date();

  formEmployee = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthDate: new FormControl('', [Validators.required]),
    basicSalary: new FormControl(0, [Validators.required, Validators.min(0)]),
    status: new FormControl('', [Validators.required]),
    group: new FormControl('', [Validators.required, this.validationGroup.bind(this)]),

    description: new FormControl('', [Validators.required])
  });

  
  filteredOptions: Observable<string[]> = new Observable<string[]>(); 

  setValueDataEmployee(){
    this.dataEmployee = this.formEmployee.getRawValue();
    this.dataEmployeeChange.emit(this.dataEmployee);
  }

  resetData(){
    this.formEmployee.reset();
    this.dataInvalid = false;
    this.dataInvalidChange.emit(this.dataInvalid);
    this.formEmployee.get('basicSalary')?.setValue(0);
    this.setValueDataEmployee();
  }

  selectGroup(data:any){
    console.log(data,'data')
  }

  filterAutoComplete(value: string): string[] {
    const filterValue = value.toLowerCase();
  
    return this.Groups.filter((option) => option.toLowerCase().includes(filterValue));
  }

  validationGroup(control: AbstractControl): ValidationErrors | null {
    const checkform = this.Groups.includes(control.value);
  
    return checkform ? null : { notExist: true };
  }
  

  getErrorMessage(element: any):string {
    if (element.errors) {
      if (element.errors['required']) {
        return 'Required!';
      }
  
      if (element.errors['notExist']) {
        return 'Not exist!';
      }
  
      if (element.errors['email']) {
        return 'Email address invalid!';
      }

      if (element.errors['min']) {
        return 'Min ' + element.errors['min']['min'] + '!';
      }
    }
  
    return '';
  }


  ngOnInit(): void {
   const triggerDataEmployeeSubscription = this.triggerDataEmployeeBehaviorSubject.subscribe((res)=>{
      if(res){
        this.formEmployee.markAllAsTouched();
        let count = 0;
        Object.keys(this.formEmployee.controls).forEach((key: string) => {
          const control = this.formEmployee.get(key);
          if (control && control.invalid) {
            count++;
          }
        });

        if(count > 0){
          this.dataInvalid = true;
          this.dataInvalidChange.emit(this.dataInvalid);
        }else{
          this.dataInvalid = false;
          this.dataInvalidChange.emit(this.dataInvalid);
        }

        this.setValueDataEmployee();
      }else{
        this.resetData();
      }
    })

    this.subscriptionList.push(triggerDataEmployeeSubscription);

    const setDataEditEmployeeSubscription = this.setDataEditEmployeeBehaviorSubject.subscribe((res)=>{
      if(Object.keys(res).length > 0){
        this.formEmployee.patchValue(res);
        this.setValueDataEmployee();
      }
    });

    this.subscriptionList.push(setDataEditEmployeeSubscription);

    this.filteredOptions = this.formEmployee.controls.group.valueChanges.pipe(
      startWith(''),
      map(value => this.filterAutoComplete(value || ''))
    );

  }

  ngOnDestroy(){
    this.subscriptionList.forEach((subscription)=>{
      subscription.unsubscribe();
    })
  }


}
