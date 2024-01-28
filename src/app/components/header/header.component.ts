import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivationStart } from '@angular/router';
import { MainConfigService } from 'src/app/main-config.service';
import { MenuList } from 'src/app/models/MenuList';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideNav = new EventEmitter();

  constructor(private router:Router,public mainconfig:MainConfigService) {

  }


  valueSidenav = true;

  triggerSidenav(){
    this.valueSidenav = !this.valueSidenav;
    this.toggleSideNav.emit(this.valueSidenav);
  }



  logout(){
    this.router.navigate(['login'])
    localStorage.clear()
  }

  ngOnInit(): void {

  }

}
