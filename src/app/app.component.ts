import { Component } from '@angular/core';
import { LayoutService } from 'app/shared-module/services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  isSidebarVisible: boolean = false;

  constructor(
    private layoutService: LayoutService
  ) { }

  ngOnInit() {
    this.layoutService.sidebarSource$.subscribe(isVisible => {
      this.isSidebarVisible = isVisible;
    })
  }
}
