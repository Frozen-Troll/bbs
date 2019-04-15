import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Post } from "./model/PostModel";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
    'Authorzation':'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl = '/posts';

  constructor(
    private http:HttpClient
  ) { }

  //请求板块id为community的帖子
  getPosts(community:string):Observable<Post[]>{
    const url=`${this.postsUrl}?community=${community}`;
    return this.http.get<Post[]>(url);
  }
  //请求帖子id为id的所有回帖
  getResPosts(id:string):Observable<Post[]>{
    const url=`${this.postsUrl}/${id}`;
    return this.http.get<Post[]>(url);
  }
  //请求板块id为community的所有置顶帖
  getTopposts(community:string):Observable<Post[]>{
    const topurl=`${this.postsUrl}/top?community=${community}`;
    return this.http.get<Post[]>(topurl);
  }
  //向服务器发帖
  addPost(post:Post):Observable<Post>{
    return this.http.post<Post>(this.postsUrl,post,httpOptions);
  }
  //回帖
  replyPost(post:Post):Observable<Post>{
    const replyUrl=`${this.postsUrl}/${post.parentId}`
    return this.http.post<Post>(replyUrl,post,httpOptions);
  }

}
