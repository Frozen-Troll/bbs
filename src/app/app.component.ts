import { Component } from '@angular/core';
import { User } from "./model/UserModel";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user:User;
  islogin:boolean=false;
  title = 'BBS';
}
