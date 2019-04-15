import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Community } from "./model/CommunityModel";
import { User } from "./model/UserModel";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
    'Authorzation':'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private communityUrl='api/communities';
  private userUrl = '/users';

  constructor(
    private http: HttpClient
  ) { }

  //登录
  sendLogin(user:User):Observable<User>{
    return this.http.post<User>(this.userUrl,user,httpOptions);
  }

  //请求板块列表
  getCommunities():Observable<Community[]>{
    return this.http.get<Community[]>(this.communityUrl);
  }

  //请求某一板块
  getCommunity(id:string):Observable<Community[]>{
    const url=`${this.communityUrl}/${id}`;
    return this.http.get<Community[]>(url);
  }

}
