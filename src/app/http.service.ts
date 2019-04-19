import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpEvent,HttpInterceptor,HttpHandler,HttpRequest, HttpResponse } from "@angular/common/http";

import { Community } from "./model/CommunityModel";
import { User } from "./model/UserModel";
import { Observable } from 'rxjs';
import { map,tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
    'Authorzation':"Bearer " + localStorage.getItem('jwt')
  })
};

const httpOptionsForTextEvent = {
  headers: new HttpHeaders({
    'Accept':'text/event-stream',
    'Authorzation':'my-auth-token'
  })
};

export interface Token{
  token:string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService implements HttpInterceptor{

  private communityUrl='/communities';
  private loginUrl = '/login';

  constructor(
    private http: HttpClient
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }

  //登录
  sendLogin(user:User):Observable<Token>{
    return this.http.post<Token>(this.loginUrl,user,httpOptions);
  }

  sendRegister(user:User):Observable<string>{
    const url='/signup';
    return this.http.post<string>(url,user,httpOptions);
  }
  //请求user
  getUser(username:string):Observable<User>{
    const url='/users/'+username;
    return this.http.get<User>(url);
  }
  deleteUser(id:string){
    const url = 'users/'+id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('jwt')
      })
    };
    return this.http.delete<User>(url, httpOptions);
  }

  //请求板块列表
  getCommunities():Observable<Community[]>{
    return this.http.get<Community[]>(this.communityUrl,httpOptionsForTextEvent);
  }

  //请求某一板块
  getCommunity(id:string):Observable<Community[]>{
    const url=`${this.communityUrl}/${id}`;
    return this.http.get<Community[]>(url);
  }



}
