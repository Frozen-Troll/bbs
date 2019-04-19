import { Component, OnInit } from '@angular/core';

import { User } from '../model/UserModel';
import { HttpService } from "../http.service";

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {
  users: User[];
  displayedColumns: string[] = ['username', 'ban'];

  constructor(
    private httpService:HttpService
  ) { }

  ngOnInit() {

  }

  //搜索用户
  searchUsers(name: string): void {
    name=name.trim();
    let searchUserSource = new EventSource('/search/users/'+name);
    let user = new User;
    let flag = true;

    searchUserSource.addEventListener('message', response => {
      if (flag == true) {
        this.users = [];
        flag = false;
      }
      user = JSON.parse((<MessageEvent>response).data);
      this.users.push(user);
    });
    searchUserSource.addEventListener('error', response => {
      if (response.eventPhase == searchUserSource.CLOSED) {
        flag = true;
      }
    });
  }

  banUser(name:string):void{
    this.httpService.deleteUser(name).subscribe(() =>this.users.filter(user =>user.username!=name));
  }
}
