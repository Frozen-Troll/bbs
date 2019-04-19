import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

import { User } from "../model/UserModel";
import { HttpService } from "../http.service";
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private myhttp:HttpService,
    private location: Location,
    private app:AppComponent
  ) { }

  ngOnInit() {
  }

  register(username:string,password:string):void{
    username = username.trim();
    password = password.trim();
    if (!username) { return; }
    this.myhttp.sendRegister({ username, password } as User).subscribe(() => {
      alert("注册成功");
      this.goBack();
    });
  }

  goBack(): void {
    this.location.back();
  }

}
