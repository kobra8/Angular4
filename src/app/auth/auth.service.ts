import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

// Sprawdzanie robocze loginu i hasła

private credentials = {
  login: 'admin',
  password: 'admin'
}

private isUserLoggedIn = false;

login(login, password) {
  // Tu powinno iść zapytanie do serwera w sprawie loginu
  return new Promise((resolve, reject) => {
    if(login === this.credentials.login && password === this.credentials.password ) {
      this.isUserLoggedIn = true;
      resolve();
    }
    else {
      reject()
    }
  })
}
isLoggedIn() {
  return this.isUserLoggedIn;
}

}
