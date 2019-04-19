import { Component } from '@angular/core';
import { Event } from "@angular/router";
import { HttpResponse, HttpEvent } from "@angular/common/http";
import { from } from "rxjs";
import { map } from "rxjs/operators";

import { User } from "./model/UserModel";
import { Community } from "./model/CommunityModel";
import { HttpService } from "./http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User;
  islogin: boolean;
  communities: Community[];
  title = 'BBS';

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.user = new User;
    localStorage.clear();
    console.log(this.islogin);
    this.communities = [];  //初始化数组
    this.getSSECommunities();
    //console.log("我出生了");
    //setInterval("this.getSSECommunities()", 2000);
  }



  //从服务器接受SSE消息的community
  getSSECommunities(): void {
    let source = new EventSource('/communities');
    let comm = new Community;
    let flag = true;

    source.addEventListener('message', response => {
      if (flag == true) {
        this.communities = [];
        flag = false;
      }
      comm = JSON.parse((<MessageEvent>response).data);
      this.communities.push(comm);
    });
    source.addEventListener('error', response => {
      if (response.eventPhase == source.CLOSED) {
        flag = true;
      }
    });
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    if (role == "ROLE_ADMIN")
      return true;
    else
      return false;
  }

  logout():void{
    localStorage.clear();
    this.islogin=false;
  }
}
