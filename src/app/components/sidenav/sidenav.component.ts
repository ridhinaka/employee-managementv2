import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainConfigService } from 'src/app/main-config.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})

export class SidenavComponent implements OnInit {

  constructor(private router:Router,public mainconfig:MainConfigService) {}

  @Input() valueSidenav: boolean = true;

  showFiller = true;

  triggerSidenav(){
    this.valueSidenav = !this.valueSidenav;
  }

  routeNavigate(element: any) {
    
    this.mainconfig.menuSelected = element['title'];
    this.router.navigate([element['route']]);

  }

  ngOnInit(): void {}
}
