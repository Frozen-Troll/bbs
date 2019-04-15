import { Component, OnInit } from '@angular/core';

import { Community } from "../model/CommunityModel";
import { HttpService } from "../http.service";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  private communities:Community[];

  constructor(
    private httpService:HttpService
  ) { }

  ngOnInit() {
    this.getCommunities();
  }

  getCommunities():void{
    this.httpService.getCommunities().subscribe(communities => this.communities=communities);
  }

}
