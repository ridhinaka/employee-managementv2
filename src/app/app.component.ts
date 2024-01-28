import { Component, OnInit } from '@angular/core';
import { MainConfigService } from './main-config.service';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'employee-management';

  constructor(
    private mainconfig:MainConfigService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private location: Location
  ){}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = this.location.path();
        const normalizePath = (path: string) => path.replace(/^\//, '');
        const url = normalizePath(currentUrl);
 
        const pageName = this.mainconfig.menuDisplay.find(eachRow => eachRow.route.includes(url));

        if(pageName){
          this.mainconfig.menuSelected = pageName.title;
        }


        console.log('Page yang dipilih:', this.mainconfig.menuSelected);
      }
    });
  }


}
