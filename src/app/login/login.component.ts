import { Component, OnInit, Input } from '@angular/core';
import { Location } from "@angular/common";

import { User } from "../model/UserModel";
import { HttpService } from "../http.service";
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  @Input() app2: User;

  constructor(
    private myhttp: HttpService,
    private location: Location,
    private app: AppComponent
  ) { }

  ngOnInit() {

  }


  submit(username: string, password: string): void {
    username = username.trim();
    password = password.trim();
    if (!username) { return; }
    this.myhttp.sendLogin({ username, password } as User).subscribe(token => {
      console.log(token);//test
      localStorage.setItem('jwt', token.token);
      this.app.islogin = true;

      this.myhttp.getUser(username).subscribe(user => {
        this.app.user = user;
        console.log(this.app.user.roles);
        console.log(this.app.user.roles[0]);
        localStorage.setItem('role', this.app.user.roles[0]);
      });

      alert("登录成功");
      this.goBack();
    });
  }

  goBack(): void {
    this.location.back();
  }

}
