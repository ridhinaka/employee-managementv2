import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  triggerDataBehaviorSubject = new BehaviorSubject<any>(null);

  generateID(key:string){
    const maxId = JSON.parse(this.getData(key)).reduce((max:any, item:any) => (item.id > max ? item.id : max), -1);
    const newId = maxId + 1;

    return newId;
  }

  saveData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }


  getData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }

  getDatabyID(key: string,id: any) {
    const dataRaw = this.getData(key);
    const data = JSON.parse(dataRaw);

    const employee = data.find((employee: any) => employee.id == id);


    return employee;
  }
}
