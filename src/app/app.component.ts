import { Component, Input } from '@angular/core';
import { LayoutService } from 'app/shared-module/services/layout.service';
import { LoaderComponent } from 'app/core-module/loader/loader.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  entryComponents: []
})
export class AppComponent {
  isSidebarVisible: boolean = false;
  @Input() isLoading: boolean;

  constructor(
    private layoutService: LayoutService,
    private loader: LoaderComponent
  ) { }

  ngOnInit() {
    this.layoutService.sidebarSource$.subscribe(isVisible => {
      this.isSidebarVisible = isVisible;
    })
  }


}
