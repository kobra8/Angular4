import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { SharedModule } from 'app/shared-module/shared.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    SidebarComponent,
    LoaderComponent
   ],
  declarations: [
    SidebarComponent,
    LoaderComponent    
  ],
  providers: [
    LoaderComponent
  ]
})
export class CoreModule { }
