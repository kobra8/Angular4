import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cs-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
