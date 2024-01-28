import { Injectable } from '@angular/core';
import { MenuList } from './models/MenuList';

@Injectable({
  providedIn: 'root'
})


export class MainConfigService {


  menuSelected = '';
  menuDisplay:MenuList[] = [
    {
      icon: 'groups',
      title: 'Employee List',
      route: 'app/employee-list',
    },
    {
      icon: 'person_add',
      title: 'Register New Employee',
      route: 'app/register-employee',
    },
    {
      icon: 'person_add',
      title: 'Detail Employee',
      route: 'app/detail-employee',
    },
  ];

  constructor() { }
}
