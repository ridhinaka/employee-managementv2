import { Component } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent {
  valueSidenav = true;
  
  toggleSidenv(data:boolean){
    this.valueSidenav = data
  }
  
}
