import { Component, OnInit } from '@angular/core';

import { User } from "../model/UserModel";
import { HttpService } from "../http.service";
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private myhttp:HttpService,
    private app:AppComponent
  ) { }

  ngOnInit() {
  }
  
  submit(username: string, password: string):void{
    username=username.trim();
    password=password.trim();
    if(!username){return;}
    this.myhttp.sendLogin({username,password}as User).subscribe((result:any) =>console.log());
    this.app.islogin=true;
  }

}
