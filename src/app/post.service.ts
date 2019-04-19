import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Post } from "./model/PostModel";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + localStorage.getItem('jwt')
  })
};

const httpOptionsForTextEvent = {
  headers: new HttpHeaders({
    'Content-Type': 'text/event-stream',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl = '/posts';

  constructor(
    private http: HttpClient
  ) { }


  //请求板块id为community的帖子
  getPosts(community: string): Observable<Post[]> {
    const url = `${this.postsUrl}?community=${community}`;
    return this.http.get<Post[]>(url, httpOptionsForTextEvent);
  }
  //请求帖子id为id的所有回帖
  getResPosts(id: string): Observable<Post[]> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<Post[]>(url, httpOptionsForTextEvent);
  }
  //请求板块id为community的所有置顶帖
  getTopposts(community: string): Observable<Post[]> {
    const topurl = `${this.postsUrl}/top?community=${community}`;
    return this.http.get<Post[]>(topurl, httpOptionsForTextEvent);
  }

  //向服务器发帖
  addPost(post: Post): Observable<Post> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('jwt')
      })
    };
    return this.http.post<Post>(this.postsUrl, post, httpOptions);
  }

  //设置置顶
  setTopPost(post:Post){
    const url="/posts/top/"+post.id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('jwt')
      })
    };
    return this.http.post<Post>(url,post,httpOptions);
  }

  //删帖
  deletePost(post: Post) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('jwt')
      })
    };
    const url = `${this.postsUrl}/${post.id}`;
    return this.http.delete<Post>(url, httpOptions);
  }

  //回帖
  replyPost(post: Post): Observable<Post> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('jwt')
      })
    };
    const replyUrl = `${this.postsUrl}/${post.parentId}`
    return this.http.post<Post>(replyUrl, post, httpOptions);
  }

  //http修改帖子
  editPost(post: Post): Observable<any> {
    const url = `${this.postsUrl}/${post.id}`;
    return this.http.put(url, post, httpOptions);
  }

  //请求热帖
  getHotPost(): Observable<Post[]> {
    const url = "posts/hot";
    return this.http.get<Post[]>(url);
  }

}
