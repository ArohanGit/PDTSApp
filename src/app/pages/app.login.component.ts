import { Component,  OnInit } from '@angular/core';
import { AppLoginService } from '../core/services/app.login.service';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent implements OnInit {
  loginCredentials: any;

  constructor(private appLoginService: AppLoginService) {}

  ngOnInit() {
    this.loginCredentials = {UserName: '', Password: ''};
  }

  loginClick(e) {
    // this.appLoginService.loggedIn('test');
    this.appLoginService.authenticate({ userId: '', userName: this.loginCredentials.UserName, password: this.loginCredentials.Password, RoleName: '' });
  }
}
