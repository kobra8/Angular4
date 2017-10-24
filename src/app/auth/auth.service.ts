import { Injectable } from '@angular/core';
import { LayoutService } from 'app/shared-module/services/layout.service';

@Injectable()
export class AuthService {

  constructor(
    private layoutService: LayoutService
  ) { }
  // Sprawdzanie robocze loginu i hasła

  private credentials = {
    login: 'admin',
    password: 'admin'
  }

  private isUserLoggedIn = false;

  login(login, password) {
    // Tu powinno iść zapytanie do serwera w sprawie loginu
    return new Promise((resolve, reject) => {
      if (login === this.credentials.login && password === this.credentials.password) {
        this.isUserLoggedIn = true;
        this.layoutService.showSidebar();
        resolve();
      }
      else {
        reject()
      }
    })
  }

logout() {
  this.isUserLoggedIn = false;
  this.layoutService.hideSidebar();
}

  isLoggedIn() {
    return this.isUserLoggedIn;
  }

}
