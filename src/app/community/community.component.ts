import { Component, OnInit } from '@angular/core';

import { Community } from "../model/CommunityModel";
import { HttpService } from "../http.service";
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  private communities: Community[];

  constructor(
    private httpService: HttpService,
    private app: AppComponent
  ) { }

  ngOnInit() {
    //this.getCommunities();
    this.getSSECommunities();
  }

  getCommunities(): void {
    this.communities = this.app.communities;
  }

  getCommunitiesText(): void {
    //this.communities.push(this.httpService.getUpdated());
  }

  //从服务器接受SSE消息的community
  getSSECommunities(): void {
    let comm2Source = new EventSource('/communities');
    let comm = new Community;
    let flag = true;

    comm2Source.addEventListener('message', response => {
      if (flag == true) {
        this.communities = [];
        flag = false;
      }
      comm = JSON.parse((<MessageEvent>response).data);
      this.communities.push(comm);
    });
    comm2Source.addEventListener('error', response => {
      if (response.eventPhase == comm2Source.CLOSED) {
        flag = true;
      }
    });
  }

}
