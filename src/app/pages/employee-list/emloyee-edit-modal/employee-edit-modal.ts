import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-employee-edit-modal',
    templateUrl: './employee-edit-modal.html',
    styleUrls: ['./employee-edit-modal.scss']
})

export class EmployeeEditModal implements OnInit {
    constructor(
        private dialogref: MatDialogRef<EmployeeEditModal>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    dataEmployee = {};
    setDataEditEmployeeBehaviorSubject = new BehaviorSubject<any>({});
    triggerDataEmployeeBehaviorSubject = new BehaviorSubject<any>(false);

    closeDialog(statusCode = {statusCode:0,data:{}}) {
        this.dialogref.close(statusCode);
    }

    updateEmployee() {
        this.triggerDataEmployeeBehaviorSubject.next(true);
        this.closeDialog({statusCode:1,data:this.dataEmployee});
    }

    ngOnInit(): void {
        console.log(this.data, 'this data')
        this.setDataEditEmployeeBehaviorSubject.next(this.data);
    }
}