import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Community } from "./model/CommunityModel";
import { User } from "./model/UserModel";
import { Observable } from 'rxjs';

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
  private communityUrl='';
  private userUrl = '/posts';

  constructor(
    private http: HttpClient
  ) { }

  sendLogin(user:User):Observable<User>{
    return this.http.post<User>(this.userUrl,user,httpOptions);
  }




  getCommunities():Observable<Community[]>{
    return this.http.get<Community[]>(this.communityUrl);
  }

}
