import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'loader',
    template: `<div class="loader" *ngIf="isLoading"></div>`,
    styleUrls: ['./loader.less']
})

export class LoaderComponent implements OnInit {
    isLoading: boolean = false;

    constructor(
        private router: Router
    ) {}
    ngOnInit() {
        this.router.events.subscribe((routerEvent: Event) => this.checkRouterEvent(routerEvent));
        
    }

    private checkRouterEvent(routerEvent: Event) {
        if(routerEvent instanceof NavigationStart) {
          this.isLoading = true;
        } else if (
          routerEvent instanceof NavigationEnd 
          || routerEvent instanceof NavigationCancel 
          || routerEvent instanceof NavigationError 
        ) {
          this.isLoading = false;
        }
      }
 }